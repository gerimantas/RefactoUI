# Poetry Official Documentation (Excerpt)

## What is Poetry?
Poetry is a tool for dependency management and packaging in Python. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.

## Key Features
- Dependency resolution and management
- Isolated virtual environments
- Project packaging and publishing
- pyproject.toml as the single source of truth

## Basic Commands
- `poetry init` – Create a new pyproject.toml file interactively
- `poetry install` – Install dependencies from pyproject.toml
- `poetry add <package>` – Add a new dependency
- `poetry remove <package>` – Remove a dependency
- `poetry update` – Update dependencies
- `poetry lock` – Generate or update poetry.lock
- `poetry run <cmd>` – Run a command inside the virtual environment
- `poetry shell` – Spawn a shell within the virtual environment
- `poetry env list` – List all virtual environments
- `poetry env use <python>` – Set the Python version for the environment
- `poetry env remove <python>` – Remove the virtual environment

## Environment Management
Poetry automatically creates a virtual environment for each project. You can specify the Python version in your pyproject.toml or with `poetry env use`.

## Troubleshooting
- If dependencies are not found, ensure you are running commands with `poetry run` or inside `poetry shell`.
- If the environment is corrupted, remove it with `poetry env remove` and recreate it with `poetry install`.
- Always check that the correct Python version is used with `poetry env use <python_version>`.

## Documentation
For full documentation, visit: https://python-poetry.org/docs/

---
*This is an excerpt for project reference. For the latest and complete documentation, always refer to the official Poetry website.*


Remiantis oficialia Poetry dokumentacija, teisingas ir rekomenduojamas būdas instaliuoti Poetry yra:

Naudoti pipx (saugiausia, izoliuota, nepriklauso nuo projekto virtualenv):
pip install pipx
pipx install poetry

Poetry niekada neturi būti instaliuojamas projekto virtualioje aplinkoje – jis turi būti globalus, izoliuotas per pipx.

Priklausomybių diegimas projekte:
Visi veiksmai atliekami iš projekto šaknies, kur yra pyproject.toml.

Priklausomybės pridedamos:
poetry add libcst

Diegiamos:
poetry install

Poetry automatiškai sukuria ir naudoja virtualią aplinką (nebent nurodoma kitaip):
Norint naudoti konkrečią Python versiją:
poetry env use C:\kelias\iki\python.exe

Patikrinti, kokia virtualenv naudojama:
poetry env info
Priklausomybės turi būti nurodytos [tool.poetry.dependencies] sekcijoje, o ne [dev-dependencies], jei jos reikalingos runtime.

Poetry diegia priklausomybes į savo virtualenv, o ne į sisteminį pip – todėl visada naudok poetry run ... arba aktyvuok virtualenv rankiniu būdu, jei reikia.

Jei priklausomybė neįsirašo:

Patikrink, ar nėra klaidų pyproject.toml.
Paleisk:
poetry lock --no-update
poetry install

Jei reikia, gali naudoti:
poetry run pip install <package>

bet tai laikinas sprendimas – visada pataisyk pyproject.toml.

Santrauka:
Instaliuok Poetry su pipx, ne per pip ar į virtualenv.
Priklausomybes pridėk ir diek tik per poetry add ir poetry install.
Vykdyk testus tik per poetry run pytest.
Jei priklausomybė neįsirašo – atnaujink lockfile, patikrink pyproject.toml, nenaudok rankinio pip.
