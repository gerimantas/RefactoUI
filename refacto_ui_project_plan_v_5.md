# RefactoUI\_Project\_Plan\_v5

# Copilot AI Assistant Instruction 

## Objective
- Strictly follow the action sequence of the RefactoUI_Project_Plan_v5.
- Fully complete, document, and test each section before moving to the next.
- Maintain a project progress log.
- Use only open-source tools specified in the plan; no proprietary or out-of-scope solutions.
- Communicate only clear, justified steps and status.

---

## 1. Plan Execution Rules

1. **Follow plan sections in exact order**
    - Never start another section until the current one is fully complete and all tests pass.
2. **Log every action in the progress journal**
    - For every step, record the date, action, result (e.g. "2.2 Rule Engine – finished, all tests pass, committed").
3. **Never skip ahead**
    - If an unclear situation arises, stop and log the issue immediately before proceeding.
4. **Mandatory testing for every step**
    - If any test fails, the section is considered incomplete and may not be marked as done.
5. **Use only the OSS tools listed in each section**
    - If extra dependencies are required, ensure they are open-source and log them in the progress journal.
6. **Log all deviations from the plan**
    - Any deviation must be justified and documented in the journal.

---

## 2. Progress Log Template

| Date/Time  | Plan Section     | Action       | Result     | Comment   |
|------------|-----------------|-------------|------------|-----------|
| YYYY-MM-DD | 2.1 Scanner     | Created, tested | Tests OK | Committed |

- Fill out the log for every section, even if a section spans multiple days.

---

## 3. AI Assistant Behavior Requirements

- **Announce each section start**  
  "Starting 1.1 Python Environment. Goal: ..."
- **Summarize after each section**  
  "1.1 Python Environment complete and tested. Proceeding to 1.2."
- **If an issue arises, stop and report immediately**  
  "2.4 History Logger – Alembic migration issue, pausing until resolved."
- **Each completed step must be entered into the progress log.**
- **If you receive human feedback or corrections, log it as a separate entry.**

---

## 4. Additional Rules for the AI Assistant

- Before starting a step, review the recommended OSS tools for that section and ensure only those are used.
- Never modify the plan structure—only execute, log progress, and provide status updates.
- Periodically (e.g., daily), generate a summary of the progress log.
- If the log shows any section as incomplete, do NOT proceed to others.

---

## 5. Getting Started

1. Begin with **1.1 Python Environment** – create the environment, update the log, run tests.
2. Only after completing this section, continue to **1.2 Open Source Policy**, and so on.


## 1. Project Setup

### 1.1 Python Environment

**Recommended OSS tools**: Poetry, pyenv, pipx

- **Standard**: Use Poetry with exclusive `pyproject.toml` (no `requirements.txt`).
- **Developer Comment**:\
  *Poetry is OSS (MIT), widely adopted for Python project management.*

### 1.2 Open Source Policy

**Recommended OSS tools**: Black, isort, Rich, shadcn/ui, Radix, pyfakefs, structlog

- **Priority**: Always evaluate and use high-quality OSS solutions for every module.
- **Developer Comment**:\
  *Contribute improvements/patches upstream and log them in **``**.*

### 1.3 Configuration Management

**Recommended OSS tools**: Poetry, Pydantic

- **Config**: All under `[tool.refactoui]` in `pyproject.toml`
- **Developer Comment**:\
  *OSS config via pyproject; Pydantic (OSS) for runtime validation.*

### 1.4 Version Control

**Recommended OSS tools**: Git, pre-commit, commitlint

- **Setup**: Git repo, `.gitignore`, branch protection, reviews, pre-commit hooks (black, isort, flake8, commitlint).
- **Developer Comment**:\
  *All tools are OSS, integrate via **``** config.*

### 1.5 Directory Structure

**Recommended OSS tools**: Poetry, pyfakefs (for test fixtures)

```
refactoui/
├── refactoui/            # core package
│   ├── __init__.py
│   ├── scanner.py
│   ├── rule_engine.py
│   ├── refactorer.py
│   └── history.py
├── tests/
│   ├── test_scanner.py
│   ├── test_rule_engine.py
│   └── fixtures/
├── ui/                   # Next.js, React
├── docs/                 # Sphinx
├── .github/
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
└── Makefile
```

- **Developer Comment**:\
  *All structure and test tools are open-source.*

---

## 2. Core Functionality

### 2.1 Scanner (`scanner.py`)

**Recommended OSS tools**: libcst, ast, pyfakefs

- **AST-based** (`libcst`/OSS) with parallel scanning (`concurrent.futures`).
- **Exclude/include patterns**; handles large repos.
- **Developer Comment**:\
  *libcst (MIT) enables robust code analysis/modification.*

### 2.2 Rule Engine (`rule_engine.py`)

**Recommended OSS tools**: libcst, Pydantic, Prometheus-client, pluggy

- **Rules**:
  - Max Depth (configurable)
  - Naming Conventions
  - Cycle Detection
- **Rule registration**: decorators, pluggy plugin system (OSS).
- **Prometheus metrics**: `prometheus_client` (OSS).
- **Developer Comment**:\
  *Use pluggy for plugin support, Prometheus OSS for metrics.*

### 2.3 Refactorer (`refactorer.py`)

**Recommended OSS tools**: GitPython, black, isort, pytest

- **Transactional writes**: Use `pyfakefs` for test mocks.
- **Diff**: Use Python stdlib, or OSS `difflib`.
- **Git integration**: `GitPython` (BSD).
- **Developer Comment**:\
  *All code change, git, and formatting steps are fully OSS.*

### 2.4 History Logger (`history.py`)

**Recommended OSS tools**: SQLAlchemy, Alembic, SQLite

- **Store**: SQLite DB, manage with SQLAlchemy ORM, Alembic for migrations.
- **Export**: stdlib JSON, CSV.
- **Developer Comment**:\
  *All history handling components are mature OSS.*

### 2.5 Testing & Coverage

**Recommended OSS tools**: pytest, pytest-cov, flake8, pyfakefs

- **Target**: 90%+ coverage; all tests in pytest.
- **Developer Comment**:\
  *Testing stack is pure OSS and widely supported.*

### 2.6 Security & Compliance

**Recommended OSS tools**: Safety, Bandit, Liccheck

- **Audit**: Use `safety` for deps, `bandit` for code, `liccheck` for licenses.
- **Developer Comment**:\
  *All security/compliance tools are open-source.*

---

## 3. Web UI Architecture (`ui/`)

### 3.1 Framework & State

**Recommended OSS tools**: Next.js, React, shadcn/ui, Radix UI, Zustand, React Query, Tailwind CSS

- **UI**: Next.js + React 18; shadcn/ui, Radix, Zustand, React Query, Tailwind.
- **Developer Comment**:\
  *All listed UI tools/components are MIT licensed.*

### 3.2 Title Bar & Project Selector

**Recommended OSS tools**: shadcn/ui, Radix primitives

- **UX**: Click-to-copy, recent projects (localStorage).
- **Developer Comment**:\
  *All components built using OSS primitives/libraries.*

### 3.3 Toolbar

**Recommended OSS tools**: shadcn/ui, React

- **Actions**: Scan, Proposals, Apply, Run Tests, Undo, Update Rules, History.
- **Developer Comment**:\
  *No proprietary dependencies in UI logic.*

### 3.4 Sidebar: Tree Browser

**Recommended OSS tools**: Radix UI, Zustand

- **File tree**: Expand/collapse, search, context menu.
- **Developer Comment**:\
  *Leverage OSS browser state/tools.*

### 3.5 Main Panels

**Recommended OSS tools**: shadcn/ui, React Query

- **Panels**: ScanView, ProposalView, HistoryView.
- **Developer Comment**:\
  *All panel logic/component state built with OSS.*

### 3.6 Proposals Panel & Logger

**Recommended OSS tools**: shadcn/ui, Zustand

- **Logger**: Color-coded, collapsible.
- **Developer Comment**:\
  *All UI feedback systems are open-source.*

### 3.7 Status Bar

**Recommended OSS tools**: Radix, Zustand

- \*\*Progress, status, error icon if backend unreachable.
- **Developer Comment**:\
  *No closed-source widget usage.*

---

## 4. API & CLI

### 4.1 Backend (FastAPI)

**Recommended OSS tools**: FastAPI, Pydantic, Authlib, python-jose

- **Endpoints**: REST, OpenAPI auto docs, OAuth2/JWT.
- **Developer Comment**:\
  *API, validation, and auth are built only with OSS libraries.*

### 4.2 CLI

**Recommended OSS tools**: click, argparse

- **Commands**: scan, refactor, rollback, history
- **Developer Comment**:\
  *All CLI tools OSS; click is the industry standard.*

---

## 5. CI/CD & Dev Environment

### 5.1 GitHub Actions

**Recommended OSS tools**: GitHub Actions, black, flake8, mypy, pytest, safety, bandit

- **Matrix**: Multi-Python, OSS actions for every check.
- **Developer Comment**:\
  *No CI/CD step should require closed/proprietary tools.*

### 5.2 Docker & Devcontainer

**Recommended OSS tools**: Docker, Docker Compose, VSCode devcontainer

- \**Multi-stage, non-root images; onboarding with devcontainer.json.*
- **Developer Comment**:\
  *Container tooling is 100% open-source.*

### 5.3 Release Automation

**Recommended OSS tools**: semantic-release, Poetry, Docker, GitHub Actions

- \*\*Changelog auto-gen, versioning, PyPI, Docker Hub.
- **Developer Comment**:\
  *All release infra is OSS.*

---

## 6. Extensibility & Maintenance

### 6.1 Plugin System

**Recommended OSS tools**: pluggy, setuptools

- **Plugin API**: pluggy for plugin loading, setuptools for entry points.
- **Developer Comment**:\
  *Extend/refactor logic only via OSS extension points.*

### 6.2 Multi-language Roadmap

**Recommended OSS tools**: Polyglot adapters (future via open-source)

- **Adapters**: Go/Java (OSS), roadmap only.
- **Developer Comment**:\
  *All future expansion plans are OSS-based.*

### 6.3 Monitoring & Health

**Recommended OSS tools**: Prometheus, Grafana, structlog, ELK stack

- **Expose**: `/healthz`, metrics; log via structlog JSON; dashboard in Grafana.
- **Developer Comment**:\
  *No proprietary monitoring stack allowed.*

---

## 7. Documentation & Roadmap

### 7.1 Sphinx Docs

**Recommended OSS tools**: Sphinx, autodoc

- **Autodoc**, usage, plugins, dev setup.
- **Developer Comment**:\
  *No merge w/o updated Sphinx docs.*

### 7.2 Roadmap

**Recommended OSS tools**: YAML, GitHub Projects

- \*\*Review quarterly; community proposals.
- **Developer Comment**:\
  *All roadmap/planning via OSS workflow tools.*

---

## 8. Example Configuration Files

### 8.1 `pyproject.toml`

```toml
[tool.poetry]
name = "refactoui"
version = "0.1.0"
description = "Python Refactoring Tool with Web UI"
authors = ["Team <dev@example.com>"]

[tool.refactoui]
max_nesting_depth = 4
naming_case = "snake_case"
enable_cycle_detection = true
```

*OSS-compliant project definition and config.*

---

### 8.2 `.pre-commit-config.yaml`

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black
  - repo: https://github.com/pre-commit/mirrors-isort
    rev: v5.12.0
    hooks:
      - id: isort
  - repo: https://github.com/PyCQA/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
  - repo: https://github.com/conventional-changelog/commitlint
    rev: v17.0.0
    hooks:
      - id: commitlint
```

*All open-source linting and code formatting.*

---

### 8.3 `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.9, 3.10, 3.11]
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - run: poetry install
      - run: flake8 .
      - run: black --check .
      - run: mypy .
      - run: pytest --cov=refactoui
      - run: safety check
      - run: bandit -r refactoui
      - run: cd ui && npm ci && npm run build
```

*OSS-based CI/CD for Python and React.*

---

### 8.4 `Dockerfile`

```Dockerfile
# Stage 1: build backend
FROM python:3.11-slim as builder
WORKDIR /app
COPY pyproject.toml .
RUN pip install poetry
RUN poetry export -f requirements.txt --output requirements.txt
RUN pip install --user -r requirements.txt

# Stage 2: build UI
FROM node:20-slim as ui-builder
WORKDIR /ui
COPY ui/ .
RUN npm ci && npm run build

# Stage 3: final image
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
COPY --from=ui-builder /ui/build /app/ui/build
ENV PATH=/root/.local/bin:$PATH
CMD ["uvicorn", "refactoui.backend:app", "--host", "0.0.0.0", "--port", "8000"]
```

*Secure, OSS-based multi-stage Docker build.*

---

### 8.5 `Makefile`

```Makefile
install:
	poetry install
lint:
	black . && isort . && flake8 .
test:
	pytest --cov=refactoui
build-ui:
	cd ui && npm ci && npm run build
all: install lint test build-ui
```

*OSS workflow automation.*

---

### 8.6 Sphinx documentation (`docs/index.rst`)

```
.. RefactoUI documentation master file

Welcome to RefactoUI's documentation!
=====================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   usage
   plugins
   api
```

*OSS Sphinx documentation structure.*

---

### 8.7 OSS Compliance Checklist (`OSS_COMPLIANCE.md`)

```
- [x] All dependencies are open-source (MIT/BSD/Apache-2.0)
- [x] All tools and workflows are open-source
- [x] Upstream patches/contributions documented in CONTRIBUTING.md
- [x] No proprietary code or workflow components used
```

*Ensures full open-source compliance.*

---

##

---

