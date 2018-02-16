from typing import Any, Tuple
from ..types import JudgeRole


class CachedClass:
    def __getattr__(self, key: str) -> Any:
        if key[0] == "_":
            raise RuntimeError("{} is not defined".format(key[1:]))
        value = getattr(self, f"_{key}")()
        setattr(self, key, value)
        return value


JUDGE_ROLES: Tuple[JudgeRole, ...] = (
    JudgeRole("dance_judge"),
    JudgeRole("head_judge"),
)
