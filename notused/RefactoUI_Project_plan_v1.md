# RefactoUI: Python Refactoring Tool with Web UI v1

## 1. Project Setup

- **Python Environment**: Use `pyenv` or virtual environments; include `requirements.txt` and `setup.py` (or `pyproject.toml` with Poetry).  
  <!-- DEV: Ensure consistency between requirements.txt and Poetry dependencies; consider lock file strategy. -->
- **Version Control**: Initialize Git repo with `.gitignore`, enable Git hooks for linting (pre-commit).  
  <!-- DEV: Add sample pre-commit config and enforce code style standards (black, isort). -->
- **Directory Layout**:  
  ```
  refactoui/
  ├── refactoui/            # core package
  │   ├── __init__.py
  │   ├── scanner.py
  │   ├── rule_engine.py    # fleshed out with actual checks
  │   ├── refactorer.py     # transactional file operations
  │   └── history.py
  ├── tests/                # pytest tests for each component
  ├── ui/                   # frontend source (React)
  ├── Dockerfile
  ├── docker-compose.yml
  ├── .github/
  │   └── workflows/        # CI/CD pipelines
  └── setup.py
  ```  
  <!-- DEV: Confirm folder naming aligns with package import paths; consider renaming setup.py to pyproject.toml. -->

## 2. Core Functionality

### 2.1 Scanner (`scanner.py`)
- Recursively traverse Python files.  
  <!-- DEV: Validate file inclusion/exclusion patterns (e.g., handling __pycache__). -->
- Extract AST; record modules, classes, functions.  
  <!-- DEV: Include support for typing modules and handling syntax errors gracefully. -->

### 2.2 Rule Engine (`rule_engine.py`)
- **Implemented Rules**:
  1. **Max Depth**: Fail if nested control structures exceed configured threshold.  
     <!-- DEV: Allow configurable thresholds per project via config file. -->
  2. **Naming Conventions**: Enforce `snake_case` for functions/variables, `PascalCase` for classes.  
     <!-- DEV: Provide auto-correction suggestions in proposals. -->
  3. **Cycle Detection**: Graph-based analysis of module imports to prevent circular dependencies.  
     <!-- DEV: Visualize import graph in UI for complex cycles. -->
- **Error Aggregation**: Collect warnings and errors with file, line number, description.  
  <!-- DEV: Standardize error codes and severity levels. -->
- **Unit Tests**: Each rule covered by pytest fixtures in `tests/test_rule_engine.py`.  
  <!-- DEV: Include negative tests and edge cases for each rule. -->

### 2.3 Refactorer (`refactorer.py`)
- **Transactional File Writes**:
  - Copy target file to a staging directory.  
    <!-- DEV: Clean up staging directory after rollback or success. -->
  - Apply text transformations (e.g., renaming, reformatting).  
    <!-- DEV: Integrate with Black/autopep8 for formatting consistency. -->
  - Run `pytest` on staging copy; on success, replace original; on failure, rollback and report diff.  
    <!-- DEV: Capture and display test output in UI logger. -->
- **Git Integration**: Optionally commit changes to a feature branch for review.  
  <!-- DEV: Parameterize branch naming convention and commit message format. -->

### 2.4 History Logger (`history.py`)
- Persist each refactoring step (timestamp, diff, user ID) to SQLite or JSON.  
  <!-- DEV: Ensure history schema supports rollback to any past state. -->
- Expose replay capability.  
  <!-- DEV: Add pagination and search by file or date. -->

### 2.5 Testing
- Use `pytest` and `flake8` in tests/.  
  <!-- DEV: Include coverage reporting and enforce minimum coverage. -->
- CI pipeline runs lint, unit tests, integration tests on each pull request.  
  <!-- DEV: Add badge to README showing CI status and coverage. -->

## 3. Web UI Architecture (`ui/`)

### 3.0 Title Bar & Project Selector
- **Title Bar**: Display application name and current project path at top of UI.  
  <!-- DEV: Allow project path click-to-copy and recent-projects dropdown. -->
- **Project Selector**: Button or dropdown (`Open Project`) to choose project directory; opens file dialog.  
  <!-- DEV: Validate project structure before load. -->

### 3.1 Toolbar
Quick-access buttons for main actions, matching wireframe functionality:
- **Scan**: Trigger filesystem scan (`POST /api/scan`).  
  <!-- DEV: Disable button during ongoing scan; show spinner. -->
- **Proposals**: Toggle proposals panel.  
  <!-- DEV: Show unread count badge for new proposals. -->
- **Apply Step**: Execute selected refactoring steps.  
  <!-- DEV: Confirm modal listing changes before apply. -->
- **Run Tests**: Invoke `pytest` on current workspace.  
  <!-- DEV: Display pass/fail summary after run. -->
- **Undo**: Revert last applied action.  
  <!-- DEV: Grey out if no history available. -->
- **Update Rules**: Fetch or reload rule templates dynamically.  
  <!-- DEV: Show last updated timestamp for rules. -->
- **History**: Toggle history view panel.  
  <!-- DEV: Highlight current selected history entry. -->

### 3.2 Sidebar: Tree Browser
- Display project file tree with expand/collapse.  
  <!-- DEV: Support context menu for quick actions (scan file, preview changes). -->
- **Search/Filter Field** at top for quick file lookup.  
  <!-- DEV: Debounce input and highlight matching nodes. -->

### 3.3 Main Panels
- **ScanView**: Show scan results and warnings.  
  <!-- DEV: Allow sorting and grouping by severity or file. -->
- **ProposalView**: List refactoring proposals with numbering, description, impact, and checkboxes.  
  <!-- DEV: Add inline diff preview on hover. -->
- **HistoryView**: Show past actions (timestamp, diff summary, test status) in chronological order.  
  <!-- DEV: Enable export history as JSON or CSV. -->

### 3.4 Proposals & Logger
- **Proposals Panel**: Detailed list of steps as above.  
  <!-- DEV: Bulk select/deselect proposals. -->
- **Logger Section**: Within proposals or as a footer, display execution logs per action (timestamp, result, test status).  
  <!-- DEV: Color-code log levels and provide clear collapse controls. -->

### 3.5 Status Bar
- Persistent bar at bottom showing current action (e.g., "Waiting for scan...") and progress indicator.  
  <!-- DEV: Include memory/CPU usage stats if needed for large repos. -->

## 4. API Endpoints (`backend/app.py`)

- **Authentication**: OAuth2 / API key via FastAPI’s security utilities.  
  <!-- DEV: Document scopes and token expiration handling. -->
- **Routes**:
  - `POST /api/scan`            → run scanner; return findings.  
    <!-- DEV: Support partial scan by providing file path. -->
  - `GET  /api/proposals`       → return list of refactoring proposals.  
    <!-- DEV: Allow query params to filter by file or rule type. -->
  - `POST /api/apply`           → apply selected steps; handle rollback on failure.  
    <!-- DEV: Return detailed diff in response. -->
  - `GET  /api/history`         → list past refactorings.  
    <!-- DEV: Paginate and filter by date range. -->
- **Error Handling**: Return consistent JSON with `error_code`, `message`, `details`.  
  <!-- DEV: Define error_code enum in API docs. -->
- **Input Validation**: Pydantic models for request bodies.  
  <!-- DEV: Generate OpenAPI spec and host Swagger UI. -->

## 5. CI/CD & Deployment

### 5.1 GitHub Actions
```yaml
name: CI
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with: python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Lint & Test
        run: pytest && flake8
      - name: Build UI
        working-directory: ui
        run: npm install && npm run build
```  
  <!-- DEV: Add release workflow for publishing to PyPI and Docker Hub. -->

### 5.2 Docker
- **Dockerfile**: multi-stage build (backend / frontend).  
  <!-- DEV: Use non-root user in final stage for security. -->
- **docker-compose.yml**: service definitions for API, UI, and database.  
  <!-- DEV: Configure healthchecks and env var management. -->

### 5.3 Versioning & Release
- Tag releases in Git; publish Python package to PyPI via GitHub Actions.  
  <!-- DEV: Automate changelog generation from commit messages. -->
- Publish Docker images to Docker Hub or private registry.  
  <!-- DEV: Use semantic versioning tags and image tags. -->

## 6. Packaging & Maintenance

- **Documentation**: Auto-generate Sphinx docs; host on ReadTheDocs.  
  <!-- DEV: Integrate doc builds into CI and add doc coverage badge. -->
- **Monitoring**: Health endpoint and basic Prometheus metrics.  
  <!-- DEV: Expose Grafana dashboard template. -->
- **Roadmap**: YAML file with planned features and community contributions.  
  <!-- DEV: Sync roadmap with GitHub issues and project board. -->

---
*All shortcomings from initial analysis have been addressed: concrete rule logic, transactional refactoring, security layers, CI/CD pipelines, and detailed frontend guidelines.*

