import os
import pytest
from refactoui.refactorer import Refactorer


@pytest.fixture
def fake_repo(tmp_path):
    # Create a fake git repo
    repo_path = tmp_path / "repo"
    repo_path.mkdir()
    os.chdir(repo_path)
    os.system("git init >nul 2>&1")
    (repo_path / "test.py").write_text("print('hello')\n")
    os.system("git add test.py >nul 2>&1")
    os.system("git commit -m 'init' >nul 2>&1")
    return str(repo_path)


def test_diff_files():
    old = "a\nb\nc\n"
    new = "a\nb\nC\n"
    ref = Refactorer(".")
    diff = ref.diff_files(old, new)
    assert "-c\n" in diff and "+C\n" in diff


def test_write_and_get_file_content(fake_repo):
    ref = Refactorer(fake_repo)
    ref.write_file("test.py", "print('world')\n", commit_msg="update")
    content = ref.get_file_content("test.py")
    assert content == "print('world')\n"
    # Check git log
