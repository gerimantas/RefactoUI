# RefactoUI Python Refactoring Tool with Web UI v3

## 1. Project Setup

- **Python Environment**: Standardize on Poetry with `pyproject.toml` exclusively; remove `requirements.txt` to avoid drift.
- **Open Source Resources**: Evaluate, integrate, and, where possible, contribute back to established OSS libraries and frameworks for core functionality (e.g., Black, isort, Rich, shadcn/ui, Radix). Ensure license compatibility and maintain a CONTRIBUTING.md for any upstream patches.
- **Configuration Management**: Centralize all settings under `[tool.refactoui]` in `pyproject.toml`.
- **Version Control**: Initialize Git repo with `.gitignore`; enable branch protection, required reviews, and issue templates. Enable pre-commit hooks for `black`, `isort`, and `flake8`.
- **Directory Layout**:
  ```
  refactoui/
  ├── refactoui/            # core package
  │   ├── __init__.py
  │   ├── scanner.py
  │   ├── rule_engine.py
  │   ├── refactorer.py
  │   └── history.py
  ├── tests/                # test suite
  │   ├── test_scanner.py
  │   ├── test_rule_engine.py
  │   └── fixtures/
  ├── docs/                 # Sphinx source
  ├── .github/              # workflows and issue templates
  └── pyproject.toml
  ```
- **CI/CD**: GitHub Actions for linting (`flake8`), formatting (`black --check`, `isort --check`), type checking (`mypy`), and tests (`pytest --exitfirst --maxfail=3`). Use caching for pip dependencies and Poetry.
- **Testing**: 90%+ coverage threshold; parameterized tests for edge cases; mock file system with `pyfakefs`.
- **Logging & Monitoring**: Structured JSON logs via `structlog`; log levels configurable; ship to ELK stack.
- **Security & Compliance**: Dependency audit with `safety`; static code analysis with Bandit; enforce `pyproject.toml` license field.
- **API Design**: Provide both CLI (`click`-based) and programmatic API; design consistent function signatures with docstrings and type hints.
- **Developer Experience**: Auto-generated docs from docstrings; VSCode devcontainer; Dockerfile for reproduction; include `make` shortcuts.
- **Release Strategy**: Use Semantic Release with Conventional Commits; automate changelog generation and tag creation.

## 2. Core Engine Architecture

### 2.1 Scanner (`scanner.py`)

- **AST-Based Analysis**: Leverage `libcst` for lossless parsing and code regeneration.
- **Configurable Checks**: Read rule thresholds from `[tool.refactoui]`.
- **Parallel Processing**: Use `concurrent.futures` for I/O-bound scanning.

### 2.2 Rule Engine (`rule_engine.py`)

- **Rule Registration**: Decorator-based discovery of rule classes.
- **Dynamic Loading**: Load custom rule modules via entry points.
- **Metrics Emission**: Emit Prometheus metrics for rule execution times.

### 2.3 Refactorer (`refactorer.py`)

- **Transactional Writes**: Copy files to staging directory; apply patches; run `pytest`; on success commit; on failure rollback.
- **Unified Diff Confirmation**: Generate consolidated diff for all selected changes; user confirms before apply.
- **Git Integration**: Commit to feature branch automatically with Conventional Commit message.

### 2.4 History Logger (`history.py`)

- **Change Tracking**: Store applied refactors in SQLite with timestamp, rule ID, file, and diff.
- **Rollback Support**: CLI option to revert last N changes.

## 3. Web UI Architecture

- **Framework**: Next.js with React 18.
- **UI Components**: Use shadcn/ui for cards, inputs, and dialogs; Radix primitives for accessibility.
- **State Management**: React Query for data fetching; Zustand for local UI state.
- **API Layer**: FastAPI backend exposing REST endpoints; CORS configured; OpenAPI schema auto-generated.
- **Authentication**: OAuth2 with JWT for team environments; SS0 optional.
- **Live Feedback**: WebSocket channel for real-time scan progress.

## 4. CLI UX

- **Entry Point**: `refactoui` console script.
- **Commands**: `scan`, `refactor`, `rollback`, `history`.
- **Flags**: `--dry-run`, `--output-format=json|plain`, `--rule <id>`.
- **Interactive Mode**: `--interactive` prompts user per file diff.

## 5. Integration & Extensibility

- **Plugin System**: Declare plugins via `refactoui.plugins` entry point.
- **Third-Party Hooks**: Support pre- and post- hooks for `black`, `isort`, and `flake8`.
- **Language Adapters**: Roadmap for Go and Java adapters.

## 6. Packaging & Maintenance

- **Documentation**: Sphinx with `autodoc`; host on ReadTheDocs; integrate doc build in CI; enforce doc coverage badge.
- **Monitoring**: `/healthz` endpoint; expose Prometheus metrics; provide Grafana dashboard template.
- **Roadmap**: YAML file synced with GitHub Projects; review quarterly.

---

*Optimizations incorporated: Poetry, caching, async scan, unified config, plugin system, open-source policy, semantic release, and detailed developer instructions.*

