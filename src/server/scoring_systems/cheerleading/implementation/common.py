from fractions import Fraction
from typing import Any, Dict, Iterable, List, TypeVar, Optional

T = TypeVar("T")


class CachedClass:
    @property
    def __cache(self) -> Dict[str, Any]:
        try:
            cache: Dict[str, Any] = object.__getattribute__(self, "__cache_data")
        except AttributeError:
            cache = {}
            object.__setattr__(self, "__cache_data", cache)
        return cache

    def __getattribute__(self, key: str) -> Any:
        cache = object.__getattribute__(self, "_CachedClass__cache")
        if key in cache:
            return cache[key]
        value = object.__getattribute__(self, key)
        if callable(value):
            return value
        cache[key] = value
        return value

    def __setattr__(self, key: str, value: Any) -> None:
        object.__getattribute__(self, "_CachedClass__cache")[key] = value


def safe_sum(container: Iterable[Fraction]) -> Fraction:
    return sum(container, Fraction(0))


def trim_scores(container: Iterable[T]) -> List[T]:
    srt = sorted(container)
    if len(srt) <= 2:
        return srt
    return srt[1:-1]


def float_to_frac(value: float) -> Fraction:
    return Fraction(int(round(value * 10)), 10)


def assign_places(totals: Iterable[T]) -> List[int]:
    current_place = 1
    prev_total: Optional[T] = None
    result = []
    for idx, next_total in enumerate(totals, start=1):
        if prev_total != next_total:
            current_place = idx
            prev_total = next_total
        result.append(current_place)
    return result
