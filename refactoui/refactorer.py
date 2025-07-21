import os
from git import Repo
import difflib


class Refactorer:
    def __init__(self, repo_path):
        self.repo_path = repo_path
        self.repo = Repo(repo_path)

    def diff_files(self, old_content, new_content):
        """Return a unified diff between old and new content."""
        old_lines = old_content.splitlines(keepends=True)
        new_lines = new_content.splitlines(keepends=True)
        return "".join(
            difflib.unified_diff(old_lines, new_lines, fromfile="old", tofile="new")
        )

    def write_file(self, rel_path, new_content, commit_msg=None):
        """Write new content to file, optionally commit via git."""
        abs_path = os.path.join(self.repo_path, rel_path)
        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        if commit_msg:
            self.repo.git.add(rel_path)
            self.repo.index.commit(commit_msg)

    def get_file_content(self, rel_path):
        abs_path = os.path.join(self.repo_path, rel_path)
        with open(abs_path, "r", encoding="utf-8") as f:
            return f.read()
