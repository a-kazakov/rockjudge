import os
import random
import shutil
import string
import subprocess as sp
import sys
import tempfile
import uuid
from collections import defaultdict
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime
from distutils.dir_util import copy_tree
from enum import Enum, auto
from pathlib import Path
from threading import Semaphore, Thread
from time import sleep
from typing import (
    Any,
    Callable,
    Dict,
    Generator,
    List,
    NamedTuple,
    NewType,
    Optional,
    Tuple,
    Union,
)

ExecutionId = NewType("ExecutionId", str)


class StepData(NamedTuple):
    description: Union[str, Callable[..., str]]
    func: Callable[..., None]
    terminal: bool

    def make_description(self, args: Tuple[Any, ...]) -> str:
        if isinstance(self.description, str):
            return self.description.format(*map(str, args))
        return self.description(*args)


class ExecutionStatus(Enum):
    PENDING = auto()
    STARTED = auto()
    SUCCESS = auto()
    FAILURE = auto()


@dataclass
class ExecutionData:
    parent_id: Optional[ExecutionId]
    description: str
    status: ExecutionStatus
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    def set_status(self, next_status: ExecutionStatus) -> None:
        self.status = next_status
        if next_status == ExecutionStatus.STARTED:
            self.start_time = datetime.now()
        if next_status in (ExecutionStatus.SUCCESS, ExecutionStatus.FAILURE):
            self.end_time = datetime.now()

    def _get_paint_status(self) -> str:
        if self.status == ExecutionStatus.PENDING:
            return "\033[37mqueued\033[0m"
        if self.status == ExecutionStatus.STARTED:
            return "\033[35mrunning: {:.1f}s\033[0m".format(
                (datetime.now() - self.start_time).total_seconds()
            )
        if self.status == ExecutionStatus.SUCCESS:
            return "\033[92msuccess: {:.1f}s\033[0m".format(
                (self.end_time - self.start_time).total_seconds()
            )
        if self.status == ExecutionStatus.FAILURE:
            return "\033[91mfailure: {:.1f}s\033[0m".format(
                (self.end_time - self.start_time).total_seconds()
            )

    def _get_paint_string(self, offset: int) -> str:
        return "{} - {} ({})".format(
            "  " * offset, self.description, self._get_paint_status()
        )


class ThreadWithReturn(Thread):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._return = None

    def run(self) -> None:
        if self._target is not None:
            self._return = self._target(*self._args, **self._kwargs)

    def join(self, *args):
        super().join(*args)
        return self._return


class BuildManager:
    def __init__(self) -> None:
        self.steps: Dict[str, StepData] = {}
        self.executions: Dict[ExecutionId, ExecutionData] = {}
        self.semaphore = Semaphore(max(os.cpu_count() - 1, 1))
        self.stopped = False

    def register_step(
        self,
        name: str,
        description: Union[str, Callable[..., str]],
        func: Callable[..., None],
        terminal: bool,
    ):
        self.steps[name] = StepData(description, func, terminal)

    def run_step(
        self, name: str, args: Tuple[Any, ...], parent_id: Optional[ExecutionId]
    ) -> Any:
        step_data = self.steps[name]
        execution_id = self.create_execution(step_data, args, parent_id)
        if step_data.terminal:
            self.semaphore.acquire()
        try:
            self.executions[execution_id].set_status(ExecutionStatus.STARTED)
            ctl = BuildController(self, name, execution_id, step_data.terminal)
            result = step_data.func(ctl, *args)
            self.executions[execution_id].set_status(ExecutionStatus.SUCCESS)
            return result
        except Exception:
            self.executions[execution_id].set_status(ExecutionStatus.FAILURE)
            raise
        finally:
            if step_data.terminal:
                self.semaphore.release()

    def create_execution(
        self,
        step_data: StepData,
        args: Tuple[Any, ...],
        parent_id: Optional[ExecutionId],
    ) -> ExecutionId:
        current_id = ExecutionId(uuid.uuid4().hex)
        description = step_data.make_description(args)
        self.executions[current_id] = ExecutionData(
            parent_id, description, ExecutionStatus.PENDING
        )
        return current_id

    def step_decorator(
        self, description: Union[str, Callable[..., str]], *, terminal: bool = False
    ) -> Callable:
        def wrapper(func: Callable[..., None]) -> None:
            self.register_step(func.__name__, description, func, terminal)

        return wrapper

    def start(self, first_step: str) -> None:
        th = Thread(target=self._paint_thread)
        th.start()
        try:
            self.run_step(first_step, (), None)
        finally:
            self.stopped = True
            th.join()

    def _paint_level(
        self,
        data: Dict[Optional[ExecutionId], List[ExecutionId]],
        key: ExecutionId,
        offset: int = 0,
    ) -> List[str]:
        s = self.executions[key]._get_paint_string(offset)[:120]
        s += " " * (120 - len(s))
        result = [s]
        for child in data[key]:
            result += self._paint_level(data, child, offset + 1)
        return result

    def _paint(self) -> int:
        rev_graph: Dict[Optional[ExecutionId], List[ExecutionId]] = defaultdict(list)
        for key, data in self.executions.items():
            rev_graph[data.parent_id].append(key)
        if len(rev_graph[None]) == 0:
            return 0
        lines = self._paint_level(rev_graph, rev_graph[None][0])
        print("\n".join(lines))
        return len(lines)

    def _paint_thread(self) -> None:
        last_lines = 0
        while not self.stopped:
            sys.stdout.write("\u001b[1000D\u001b[{}A".format(last_lines))
            last_lines = self._paint()
            sleep(0.1)
        sys.stdout.write("\u001b[1000D\u001b[{}A".format(last_lines))
        self._paint()


class ChildStepLauncher(NamedTuple):
    mgr: BuildManager
    step_name: str
    args: Tuple[Any, ...]
    parent_id: ExecutionId

    def run(self) -> Any:
        return self.mgr.run_step(self.step_name, self.args, self.parent_id)

    def run_nothrow(self) -> Tuple[Any, Optional[Exception]]:
        try:
            return self.run(), None
        except Exception as ex:
            return None, ex


class BuildController:
    def __init__(
        self,
        mgr: BuildManager,
        step_name: str,
        execution_id: ExecutionId,
        terminal: bool,
    ) -> None:
        self.mgr = mgr
        self.step_name = step_name
        self.execution_id = execution_id
        self.terminal = terminal

    def child_step(self, step_name: str, *args: Any) -> ChildStepLauncher:
        if self.terminal:
            raise RuntimeError("Can't create child steps from terminal step")
        return ChildStepLauncher(self.mgr, step_name, args, self.execution_id)

    def run_parallel(self, *steps: ChildStepLauncher) -> None:
        threads = [ThreadWithReturn(target=step.run_nothrow) for step in steps]
        for th in threads:
            th.start()
        results = (th.join() for th in threads)
        errors = [res[1] for res in results if res[1] is not None]
        if len(errors) > 0:
            raise errors[0]

    def run_exe(self, *args: Any, chdir=".") -> Tuple[str, str]:
        if not self.terminal:
            raise RuntimeError("Can't start new process from non-terminal step")
        p = sp.Popen(
            list(map(str, args)),
            stdout=sp.PIPE,
            stderr=sp.PIPE,
            cwd=chdir,
            creationflags=sp.ABOVE_NORMAL_PRIORITY_CLASS,
        )
        out, err = p.communicate()
        if p.returncode != 0:
            raise RuntimeError(
                f"Process finished with non-zero code {p.returncode}\n\n"
                f"STDOUT:\n{out.decode()}\n\nSTDERR:\n{err.decode()}"
            )
        return out.decode(), err.decode()

    @classmethod
    def walk_path(
        cls, base_dir: Path, additional_dir: Optional[Path] = None
    ) -> Generator[Tuple[Path, List[str]], None, None]:
        additional_dir = additional_dir or Path()
        full_dir = base_dir / additional_dir
        contents = os.listdir(str(full_dir))
        dirs = [fn for fn in contents if (full_dir / fn).is_dir()]
        files = [fn for fn in contents if (full_dir / fn).is_file()]
        yield additional_dir, files
        for d in dirs:
            yield from cls.walk_path(base_dir, additional_dir / d)

    def _create_temp_dir(self) -> Path:
        # name = "".join(random.choice(string.ascii_lowercase) for _ in range(10))
        # result = Path("_build_temp", name)
        # os.makedirs(str(result))
        # return result
        return Path(tempfile.mkdtemp())

    @contextmanager
    def make_temp_dir(self) -> Generator[Path, None, None]:
        result = self._create_temp_dir()
        try:
            yield result
        finally:
            if result.exists():
                shutil.rmtree(str(result))

    @staticmethod
    def copytree(src: Path, dst: Path) -> None:
        copy_tree(str(src), str(dst))
