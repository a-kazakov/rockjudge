from fractions import Fraction as frac
from typing import List, Union, Iterable


class CachedClass:
    def __getattr__(self, key):
        if key[0] == "_":
            raise RuntimeError("{} is not defined".format(key[1:]))
        value = getattr(self, "_" + key)()
        setattr(self, key, value)
        return value


def get_median(scores: List[frac]) -> frac:
    if len(scores) == 0:
        return frac(0)
    sorted_scores = sorted(scores)
    mid_point = len(scores) // 2
    if len(scores) % 2 == 0:
        return frac(sorted_scores[mid_point - 1] + sorted_scores[mid_point], 2)
    return sorted_scores[mid_point]


def get_scaled_median(scores: List[frac]) -> frac:
    if len(scores) == 0:
        return frac(0)
    median = get_median(scores)
    diffs = [abs(s - median) for s in scores]
    coefs = [frac(1, 1 + d ** 2) for d in diffs]
    c_scores = [s * c for s, c in zip(scores, coefs)]
    return frac(sum(c_scores), sum(coefs))


def float_to_frac(value: Union[float, int]) -> frac:
    return frac(int(round(value * 10)), 10)


def safe_max(
    values: Iterable[Union[frac, int]],
    *,
    default: Union[frac, int] = 0,
) -> frac:
    l_values = list(values)
    if len(l_values) == 0:
        return frac(default)
    return frac(max(l_values))


def safe_min(
    values: Iterable[Union[frac, int]],
    *,
    default: Union[frac, int] = 0,
) -> frac:
    l_values = list(values)
    if len(l_values) == 0:
        return frac(default)
    return frac(min(l_values))