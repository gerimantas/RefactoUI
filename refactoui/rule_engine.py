# Rule Engine for RefactoUI

import libcst as cst
import pluggy
from prometheus_client import Counter
from pydantic import BaseModel

# Prometheus metrics
RULES_RUN = Counter(
    "refactoui_rules_run_total", "Total number of rules run", ["rule_name"]
)
RULES_VIOLATIONS = Counter(
    "refactoui_rule_violations_total", "Total number of rule violations", ["rule_name"]
)

# Pluggy setup
hookspec = pluggy.HookspecMarker("refactoui")
hookimpl = pluggy.HookimplMarker("refactoui")


class RuleConfig(BaseModel):
    max_nesting_depth: int = 4
    naming_case: str = "snake_case"
    enable_cycle_detection: bool = True


class RuleResult(BaseModel):
    rule_name: str
    violations: list


class RuleBase:
    def __init__(self, config: RuleConfig):
        self.config = config

    def check(self, tree: cst.Module) -> RuleResult:
        raise NotImplementedError


# Pluggy spec


class RuleSpec:
    @hookspec
    def register_rules(self, config: RuleConfig):
        """Return a list of RuleBase instances."""


plugin_manager = pluggy.PluginManager("refactoui")
plugin_manager.add_hookspecs(RuleSpec)


def rule_plugin(cls):
    """Decorator to register a rule as a pluggy plugin."""
    plugin_manager.register(cls)
    return cls


# Example rule: Max Depth


@rule_plugin
class MaxDepthRule(RuleBase):
    @staticmethod
    @hookimpl
    def register_rules(config: RuleConfig):
        return [MaxDepthRule(config)]

    def check(self, tree: cst.Module) -> RuleResult:
        # TODO: Implement max depth check
        RULES_RUN.labels(rule_name="MaxDepthRule").inc()
        violations = []
        # ...logic...
        if violations:
            RULES_VIOLATIONS.labels(rule_name="MaxDepthRule").inc(len(violations))
        return RuleResult(rule_name="MaxDepthRule", violations=violations)


# Example rule: Naming Convention


@rule_plugin
class NamingConventionRule(RuleBase):
    @staticmethod
    @hookimpl
    def register_rules(config: RuleConfig):
        return [NamingConventionRule(config)]

    def check(self, tree: cst.Module) -> RuleResult:
        # TODO: Implement naming convention check
        RULES_RUN.labels(rule_name="NamingConventionRule").inc()
        violations = []
        # ...logic...
        if violations:
            RULES_VIOLATIONS.labels(rule_name="NamingConventionRule").inc(
                len(violations)
            )
        return RuleResult(rule_name="NamingConventionRule", violations=violations)


# Example rule: Cycle Detection


@rule_plugin
class CycleDetectionRule(RuleBase):
    @staticmethod
    @hookimpl
    def register_rules(config: RuleConfig):
        return [CycleDetectionRule(config)]

    def check(self, tree: cst.Module) -> RuleResult:
        # TODO: Implement cycle detection
        RULES_RUN.labels(rule_name="CycleDetectionRule").inc()
        violations = []
        # ...logic...
        if violations:
            RULES_VIOLATIONS.labels(rule_name="CycleDetectionRule").inc(len(violations))
        return RuleResult(rule_name="CycleDetectionRule", violations=violations)


def run_all_rules(tree: cst.Module, config: RuleConfig):
    """Run all registered rules on the given CST tree."""
    results = []
    for plugin in plugin_manager.hook.register_rules(config=config):
        for rule in plugin:
            results.append(rule.check(tree))
    return results
