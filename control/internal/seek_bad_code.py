#!/usr/bin/env python3

import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import List, NewType, Tuple


@dataclass(frozen=True)
class Error:
    path: str
    message: str

    def __str__(self) -> str:
        return f"{self.path}: {self.message}"


ErrorsList = NewType("ErrorsList", Tuple[Error, ...])
NO_ERRORS = ErrorsList(())

RELATIVE_IMPORT_RE = re.compile(r'import [^;]+ from "\.\./\.\.')
CONSOLE_LOG_RE = re.compile(r"\bconsole\.\S+")


def make_error(path: str, message: str) -> ErrorsList:
    return ErrorsList((Error(path, message),))


def check_nocommit(contents: str, path: str) -> ErrorsList:
    if "@nocommit" in contents:
        return make_error(path, "Found @nocommit string")
    return NO_ERRORS


def check_js_relative_import(contents: str, path: str) -> ErrorsList:
    if not path.endswith(".jsx"):
        return NO_ERRORS
    if RELATIVE_IMPORT_RE.search(contents):
        return make_error(path, "Found relative import in JS")
    return NO_ERRORS


def check_js_console_log(contents: str, path: str) -> ErrorsList:
    if not path.endswith(".jsx"):
        return NO_ERRORS
    if path.endswith("logging.jsx"):
        return NO_ERRORS
    if CONSOLE_LOG_RE.search(contents):
        return make_error(path, "Found console usage in JS")
    return NO_ERRORS


def check_file(contents: str, path: str) -> ErrorsList:
    return ErrorsList(
        tuple(
            (
                *check_nocommit(contents, path),
                *check_js_relative_import(contents, path),
                *check_js_console_log(contents, path),
            )
        )
    )


def main() -> None:
    base_path = Path(__file__).parent.parent.parent
    all_errors = NO_ERRORS
    for fn in base_path.glob("./src/**/*.*"):
        if "thirdparty" in str(fn):
            continue
        try:
            with open(fn, "rt", encoding="utf-8") as f:
                all_errors += check_file(f.read(), str(fn.relative_to(base_path)))
        except UnicodeDecodeError:
            # Binary file
            pass
    if all_errors:
        for err in all_errors:
            print(str(err))
        sys.exit(1)


if __name__ == "__main__":
    main()
