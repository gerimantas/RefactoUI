# RefactoUI Python Refactoring Tool with Web UI v2

## 1. Project Setup

- **Python Environment**: Standardize on Poetry with `pyproject.toml` exclusively; remove `requirements.txt` to avoid drift.
- **Configuration Management**: Centralize all settings under `[tool.refactoui]` in `pyproject.toml`.
- **Version Control**: Initialize Git repo with `.gitignore`; enforce commit-message conventions (Conventional Commits). Enable pre-commit hooks for `black`, `isort`, and `flake8`.
- **Directory Layout**:
  ```
  refactoui/
  ├── refactoui/            # core package
  │   ├── __init__.py
  │   ├── scanner.py
  │   ├── rule_engine.py
  │   ├── refactorer.py
  │   └── history.py
  ├── migrations/           # Alembic migration scripts
  ├── tests/                # pytest tests for each component
  ├── ui/                   # frontend source (React + Vite)
  ├── Dockerfile
  ├── docker-compose.yml
  ├── .github/
  │   └── workflows/        # CI/CD pipelines
  └── pyproject.toml        # includes project metadata, configs, dependencies
  ```

## 2. Core Functionality

### 2.1 Scanner (`scanner.py`)

- File-hash caching for incremental scans to speed up large repos.
- Recursively traverse Python files; support include/exclude patterns. Handle syntax errors gracefully.

### 2.2 Rule Engine (`rule_engine.py`)

- **Implemented Rules** (configurable thresholds in `[tool.refactoui]`):
  1. **Max Depth**: Nested control structures over threshold.
  2. **Naming Conventions**: `snake_case` for functions/variables, `PascalCase` for classes.
  3. **Cycle Detection**: Graph-based import cycle prevention.
- **Fast‑check Mode**: For simple formatting or rename-only proposals, bypass full pipeline.
- **Error Aggregation**: Collect warnings/errors with code, severity, file, line.
- **Unit Tests**: Comprehensive fixtures and edge-case coverage in `tests/test_rule_engine.py`.

### 2.3 Refactorer (`refactorer.py`)

- **Transactional Writes**: Copy files to staging directory; apply transformations; run `pytest`; on success commit; on failure rollback.
- **Unified Diff Confirmation**: Generate consolidated diff for all selected changes; user confirms before apply.
- **Git Integration**: Commit to feature branch automatically with Conventional Commit message.

### 2.4 History Logger (`history.py`)

- Persist to SQLite via Alembic migrations; support schema evolution.
- Include indexing for fast queries; enable replay, rollback to any state.
- Export history as JSON/CSV.

### 2.5 Testing & Performance

- **Testing**: Use `pytest`, `flake8`, `coverage`; enforce minimum coverage in CI.
- **Performance**: Benchmarks for full and incremental scans; optimize hot paths.

## 3. Web UI Architecture (`ui/`)

### 3.0 Title Bar & Project Selector

- Display app name and current path; recent-projects dropdown.
- Validate project structure on load.

### 3.1 Toolbar

- **Scan** (async): `POST /api/scan` returns `task_id`; poll `GET /api/scan/{task_id}`. Disable during scan, show spinner.
- **Proposals**: Toggle panel; badge for new items.
- **Apply Step**: Show confirmation modal with unified diff; then `POST /api/apply`.
- **Run Tests**: `POST /api/tests`; show pass/fail summary.
- **Undo**: `POST /api/undo`; disabled if no history.
- **Update Rules**: `POST /api/rules/reload`; show last update timestamp.
- **History**: Toggle history panel; search by date/file.

### 3.2 Sidebar: Tree Browser

- Expand/collapse file tree; context menu (scan file, preview).
- Search/filter with debounce; highlight matches.

### 3.3 Main Panels

- **ScanView**: Show warnings/errors; sortable by severity/file.
- **ProposalView**: List proposals with numbering, description, impact, inline diff on hover, bulk select.
- **HistoryView**: Chronological list; filter by date, file; export option.

### 3.4 Proposals & Logger

- Footer logger with color-coded levels; collapsible entries; clear on new session.

### 3.5 Status Bar

- Show current action, progress percentage, optional CPU/memory stats.

## 4. API Endpoints (`backend/app.py`)

- **Auth Modes**: API key for local MVP; pluggable OAuth2 for future multi-tenant.
- **Endpoints**:
  - `POST /api/scan` (async with `task_id`).
  - `GET /api/scan/{task_id}` (status & results).
  - `GET /api/proposals` (filterable by file/rule).
  - `POST /api/apply` (accept proposals list; return unified diff & execution log).
  - `POST /api/tests` (run tests; return summary).
  - `POST /api/undo` (rollback last action).
  - `POST /api/rules/reload` (reload rule set).
  - `GET /api/history` (paginated, filterable).
- **Error Handling**: Standardized JSON: `{error_code, message, details}` with documented enums.
- **Validation**: Pydantic models; auto-generated OpenAPI & Swagger UI.

## 5. CI/CD & Deployment

### 5.1 GitHub Actions

```yaml
name: CI
on: [push, pull_request]
jobs:
  lint-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.9, 3.10, 3.11]
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with: python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: poetry install
      - name: Lint
        run: flake8
      - name: Test
        run: pytest --cov=refactoui
  release:
    needs: lint-test
    if: startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish PyPI
        run: poetry publish --build
      - name: Publish Docker
        run: |
          echo ${{ secrets.DOCKER_PASS }} | docker login -u ${{ secrets.DOCKER_USER }} --password-stdin
          docker build -t refactoui:${{ github.ref }} .
          docker push refactoui:${{ github.ref }}
```

### 5.2 Docker

- Multi-stage `Dockerfile` using non-root user; healthcheck entrypoint.
- `docker-compose.yml` with env\_file and healthchecks for API/UI.

### 5.3 Release Automation

- Use Semantic Release with Conventional Commits.
- Automate changelog generation and tag creation.

## 6. Packaging & Maintenance

- **Documentation**: Sphinx with `autodoc`; host on ReadTheDocs; integrate doc build in CI; enforce doc coverage badge.
- **Monitoring**: `/healthz` endpoint; expose Prometheus metrics; provide Grafana dashboard template.
- **Roadmap**: YAML file synced with GitHub Projects; review quarterly.

---

*Optimizations incorporated: Poetry, caching, async scan, unified diff, SQLite + Alembic, async UI updates, parallel CI matrix, semantic release, and detailed developer instructions.*

