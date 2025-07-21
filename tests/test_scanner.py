import os
import tempfile
from refactoui import scanner


def test_scan_repository_basic():
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create sample Python files
        file1 = os.path.join(tmpdir, "a.py")
        file2 = os.path.join(tmpdir, "b.py")
        with open(file1, "w") as f:
            f.write("def foo():\n    return 42\n")
        with open(file2, "w") as f:
            f.write("def bar():\n    return 24\n")
        # Scan all files
        results = scanner.scan_repository(tmpdir)
        assert len(results) == 2
        assert all("ast" in r or "error" in r for r in results)


def test_scan_repository_exclude():
    with tempfile.TemporaryDirectory() as tmpdir:
        file1 = os.path.join(tmpdir, "a.py")
        file2 = os.path.join(tmpdir, "b.py")
        with open(file1, "w") as f:
            f.write("def foo():\n    return 42\n")
        with open(file2, "w") as f:
            f.write("def bar():\n    return 24\n")
        # Exclude b.py
        results = scanner.scan_repository(tmpdir, exclude_patterns=["*b.py"])
        assert len(results) == 1
        assert results[0]["file"].endswith("a.py")
