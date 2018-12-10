import gc
import os
import re
import time
import traceback
from collections import defaultdict
from contextlib import contextmanager
from datetime import datetime
from traceback import print_exc
from typing import Any, DefaultDict, Dict, Generator, List, NamedTuple, Optional, Type, TypeVar, Union, Callable

import sqlalchemy.event
from sqlalchemy.engine import Connection


T = TypeVar("T")


def raise_if_none(value: Optional[T], exception: Union[Exception, Type[Exception]] = ValueError) -> T:
    if value is None:
        raise exception
    return value


def catch_all_async(func):
    async def helper(*args, **kwargs):
        try:
            await func(*args, **kwargs)
        except Exception:
            print_exc()
    return helper


class DbQueryRecord(NamedTuple):
    query: str
    brief_query: str
    backtrace: str

    def __str__(self) -> str:
        return (
            f"Query: {self.query}\n"
            f"Backtrace:\n{self.backtrace}"
            f"\n"
        )


class DbQueriesLogger:
    def __init__(self, connection: Connection, context: str) -> None:
        self.context = context
        self.queries: List[DbQueryRecord] = []
        sqlalchemy.event.listen(connection, "after_execute", self._log_query)

    def _log_query(self, connection: Connection, query: Any, params: Any, _unk: Any, result: Any) -> None:
        brief_query = re.sub(r"SELECT.+?FROM", "SELECT ... FROM", str(query).replace("\n", " "))
        self.queries.append(DbQueryRecord(
            query=str(query),
            brief_query=brief_query,
            backtrace="".join(traceback.format_stack())
        ))

    def _is_suspicious(self) -> bool:
        if self.brief_stats and max(self.brief_stats.values()) >= 3:
            return True
        if len(self.queries) > 50:
            return True
        return False

    def _get_briefs_stats(self) -> Dict[str, int]:
        result: DefaultDict[str, int] = defaultdict(lambda: 0)
        for query in self.queries:
            result[query.brief_query] += 1
        return result

    def _dump_report(self, path: str) -> None:
        filename = f"report_{datetime.now():%Y-%m-%d_%H-%M-%S_%f}.txt"
        fullpath = os.path.join(path, filename)
        os.makedirs(path, exist_ok=True)
        with open(fullpath, "wt", encoding="utf-8") as f:
            print(f">>> Context: {self.context}", end="\n\n", file=f)
            print(f">>> Brief queries:", file=f)
            for brief, cnt in sorted(self.brief_stats.items(), key=lambda p: -p[1]):
                print(f"  [{cnt}] {brief}", file=f)
            print(file=f)
            for query in self.queries:
                print(">>> Verbose query:", file=f)
                print("> SQL:", file=f)
                print(query.query, file=f)
                print("> Traceback", file=f)
                print(query.backtrace, end="\n\n", file=f)
        print(f"    Report was saved to {fullpath}")

    @property
    def queries_count(self) -> int:
        return len(self.queries)

    def finalize(self) -> None:
        self.brief_stats = self._get_briefs_stats()
        if self._is_suspicious():
            print(f"WARNING: Operation {self.context} looks suspicious!")
            self._dump_report(os.path.join("logs", "db"))


@contextmanager
def timed(name: str) -> Generator[None, None, None]:
    start_time = time.monotonic()
    try:
        yield
    finally:
        duration_ms = round((time.monotonic() - start_time) * 1000)
        print(f"Timer {name}: {duration_ms}ms")


@contextmanager
def disable_gc():
    try:
        gc.disable()
        yield
    finally:
        gc.enable()
