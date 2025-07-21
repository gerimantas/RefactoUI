import libcst as cst
from refactoui import rule_engine
from prometheus_client import CollectorRegistry, Counter


def test_rule_registration():
    config = rule_engine.RuleConfig()
    # Should find all rule plugins
    plugins = rule_engine.plugin_manager.hook.register_rules(config=config)
    all_rules = [rule for plugin in plugins for rule in plugin]
    assert any(isinstance(rule, rule_engine.MaxDepthRule) for rule in all_rules)
    assert any(isinstance(rule, rule_engine.NamingConventionRule) for rule in all_rules)
    assert any(isinstance(rule, rule_engine.CycleDetectionRule) for rule in all_rules)


def test_run_all_rules_on_empty_module():
    config = rule_engine.RuleConfig()
    tree = cst.parse_module("")
    results = rule_engine.run_all_rules(tree, config)
    assert all(hasattr(r, "rule_name") for r in results)
    assert all(hasattr(r, "violations") for r in results)


def test_prometheus_metrics_increment(monkeypatch):
    # Patch the counters to use a test registry
    registry = CollectorRegistry()
    test_counter = Counter(
        "refactoui_rules_run_total", "desc", ["rule_name"], registry=registry
    )
    monkeypatch.setattr(rule_engine, "RULES_RUN", test_counter)
    config = rule_engine.RuleConfig()
    tree = cst.parse_module("")
    rule_engine.run_all_rules(tree, config)
    # Should have incremented for each rule
    metrics = registry.collect()
    found = False
    for family in metrics:
        for sample in family.samples:
            if sample.name == "refactoui_rules_run_total":
                found = True
    assert found
