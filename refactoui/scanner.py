import os
import fnmatch
import libcst as cst
from concurrent.futures import ThreadPoolExecutor, as_completed


def find_python_files(root_dir, include_patterns=None, exclude_patterns=None):
    matches = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            if filename.endswith(".py"):
                if exclude_patterns and any(
                    fnmatch.fnmatch(filepath, pat) for pat in exclude_patterns
                ):
                    continue
                if include_patterns and not any(
                    fnmatch.fnmatch(filepath, pat) for pat in include_patterns
                ):
                    continue
                matches.append(filepath)
    return matches


def scan_file_ast(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        source = f.read()
    try:
        tree = cst.parse_module(source)
        return {"file": filepath, "ast": tree}
    except Exception as e:
        return {"file": filepath, "error": str(e)}


def scan_repository(
    root_dir, include_patterns=None, exclude_patterns=None, max_workers=4
):
    files = find_python_files(root_dir, include_patterns, exclude_patterns)
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_file = {executor.submit(scan_file_ast, f): f for f in files}
        for future in as_completed(future_to_file):
            result = future.result()
            results.append(result)
    return results
