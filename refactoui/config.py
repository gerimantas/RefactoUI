from pydantic import BaseModel
import tomlkit


class RefactoUIConfig(BaseModel):
    max_nesting_depth: int = 4
    naming_case: str = "snake_case"
    enable_cycle_detection: bool = True


def load_config(path: str = "pyproject.toml") -> RefactoUIConfig:
    with open(path, "r", encoding="utf-8") as f:
        data = tomlkit.parse(f.read())
    config = data.get("tool", {}).get("refactoui", {})
    return RefactoUIConfig(**config)
