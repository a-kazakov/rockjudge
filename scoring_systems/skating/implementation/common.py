from fractions import Fraction as frac
from typing import (
    Any,
    Callable,
    Dict,
    Generic,
    List,
    Optional,
    Tuple,
    TypeVar,
    Iterable,
    Generator,
    Union,
    NewType,
    cast,
)

from scoring_systems.base import JudgeRole

T = TypeVar("T")
TF = TypeVar("TF", int, frac)
NT = TypeVar("NT")

RunIdx = NewType("RunIdx", int)


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


class Matrix(Generic[T]):
    @classmethod
    def hstack(cls, children: List["Matrix[T]"]) -> "Matrix[T]":
        if len({c.rows for c in children}) != 1:
            dims = ", ".join(f"{c.rows}x{c.cols}" for c in children)
            raise ValueError(f"Can't hstack matrixes with dimentions {dims}.")
        new_cols = sum(c.cols for c in children)
        first = children[0]
        result = cls(first.rows, new_cols, first.__default)
        for row in range(first.rows):
            offset = 0
            for child in children:
                for local_col in range(child.cols):
                    result[row, offset + local_col] = child[row, local_col]
                offset += child.cols
        return result

    def __init__(self, rows: int, cols: int, default: T) -> None:
        self.rows = rows
        self.cols = cols
        self.__default = default

    def __str__(self) -> str:
        s_mat = self.map(str)
        max_size = max(map(len, s_mat.__data))
        fmt_str = f"{{:>{max_size}s}}"
        result_buffer = []
        row_buffer = []
        for i in range(self.rows):
            for j in range(self.cols):
                row_buffer.append(fmt_str.format(s_mat[i, j]))
            result_buffer.append(" ".join(row_buffer))
            row_buffer.clear()
        return "\n".join(result_buffer)

    @property
    def __data(self) -> List[T]:
        try:
            return self.__data_value
        except AttributeError:
            self.__data_value = [self.__default] * (self.rows * self.cols)
            return self.__data_value

    @__data.setter
    def __data(self, value: List[T]) -> None:
        self.__data_value = value

    def __getitem__(self, index: Tuple[int, int]) -> T:
        y, x = self.__parse_index(index)
        return self.__data[y * self.cols + x]

    def __setitem__(self, index: Tuple[int, int], value: T) -> None:
        y, x = self.__parse_index(index)
        self.__data[y * self.cols + x] = value

    def __parse_index(self, index: Tuple[int, int]) -> Tuple[int, int]:
        y, x = index
        if not (0 <= y < self.rows and 0 <= x < self.cols):
            raise ValueError(f"Element ({y}; {x}) is out of bounds")
        return index

    def map(self, func: Callable[[T], NT]) -> "Matrix[NT]":
        result = Matrix(self.rows, self.cols, func(self.__default))
        result.__data = list(map(func, self.__data))
        return result


class SkatingSystemTour(CachedClass):
    BIG = 10**9

    @classmethod
    def filter_big(cls, value: int) -> Optional[int]:
        if abs(value) >= cls.BIG:
            return None
        return value

    @staticmethod
    def compute_skating_table(places: Matrix[TF]) -> Tuple[Matrix[TF], Matrix[TF]]:
        primary_res = Matrix[TF](places.rows, places.rows, 0)
        secondary_res = Matrix[TF](places.rows, places.rows, 0)
        for run_idx in range(places.rows):
            for judge_idx in range(places.cols):
                judge_place = places[run_idx, judge_idx]
                start_place = int(judge_place + frac(9, 10)) if isinstance(judge_place, frac) else judge_place
                for place_minus_one in range(start_place - 1, primary_res.cols):
                    primary_res[run_idx, place_minus_one] += 1
                    secondary_res[run_idx, place_minus_one] += judge_place
        return primary_res, secondary_res

    def __init__(self, places: List[List[int]]) -> None:
        self.places_by_run = places

    @property
    def judges_places_table(self) -> Matrix[int]:
        m = Matrix(self.n_runs, self.n_judges, default=0)
        for i, row in enumerate(self.places_by_run):
            for j, value in enumerate(row):
                m[i, j] = value
        return m

    @property
    def skating_table(self) -> Tuple[Matrix[int], Matrix[int]]:
        return self.compute_skating_table(self.judges_places_table)

    @property
    def skating_primary(self) -> Matrix[int]:
        return self.skating_table[0]

    @property
    def skating_secondary(self) -> Matrix[int]:
        return self.skating_table[1]

    @property
    def n_runs(self) -> int:
        return len(self.places_by_run)

    @property
    def n_judges(self) -> int:
        return 0 if self.n_runs == 0 else len(self.places_by_run[0])

    @property
    def all_places_types(self) -> Tuple[List[frac], List[int]]:
        result: List[Tuple[frac, int]] = [(frac(0), 0)] * self.n_runs
        quorum = self.n_judges // 2 + 1
        runs_with_keys: List[Tuple[int, List[int]]] = []
        # Find soring keys
        for run in range(self.n_runs):
            key: List[int] = []
            for sk_col in range(self.n_runs):
                if self.skating_primary[run, sk_col] < quorum:
                    key += [self.BIG, self.BIG]
                else:
                    key += [
                        -self.skating_primary[run, sk_col],
                        self.skating_secondary[run, sk_col],
                    ]
            runs_with_keys.append((run, key))
        runs_with_keys.sort(key=lambda x: x[1])
        # Assign places
        places_given = 0
        places_group: List[int] = []
        prev_key: Optional[List[int]] = None
        for run, key in runs_with_keys:
            if key != prev_key and len(places_group) > 0:
                place = frac(places_given + 1) + frac(len(places_group) - 1, 2)
                int_place = places_given + 1
                for pg_run in places_group:
                    result[pg_run] = (place, int_place)
                places_given += len(places_group)
                places_group.clear()
            places_group.append(run)
            prev_key = key
        # Flush remaining
        place = frac(places_given + 1) + frac(len(places_group) - 1, 2)
        int_place = places_given + 1
        for run in places_group:
            result[run] = (place, int_place)
        if len(result) == 0:
            return ([], [])
        return cast(
            Tuple[List[frac], List[int]],
            tuple(map(list, zip(*result)))
        )

    @property
    def places(self) -> List[frac]:
        return self.all_places_types[0]

    @property
    def int_places(self) -> List[int]:
        return self.all_places_types[1]

    @property
    def places_matrix(self) -> Matrix[frac]:
        result = Matrix(len(self.places), 1, frac())
        for idx, place in enumerate(self.places):
            result[idx, 0] = place
        return result

    @property
    def skating_rows(self) -> List[List[Tuple[int, int]]]:
        return [
            [
                (
                    self.skating_primary[row, col],
                    self.skating_secondary[row, col],
                )
                for col in range(self.n_runs)
            ]
            for row in range(self.n_runs)
        ]


class SkatingSystemDiscipline(CachedClass):
    def __init__(self, tours: Iterable[SkatingSystemTour]) -> None:
        self.tours = list(tours)

    @property
    def n_tours(self) -> int:
        return len(self.tours)

    @property
    def n_runs(self) -> int:
        if self.n_tours == 0:
            return 0
        return self.tours[0].n_runs

    @property
    def n_judges(self) -> int:
        if self.n_tours == 0:
            return 0
        return self.tours[0].n_judges

    @property
    def tours_places_sum(self) -> List[int]:
        # Value for rule 9
        places = [
            tour.places
            for tour in self.tours
        ]
        runs_places = zip(*places)
        return list(sum(p, 0) for p in runs_places)

    @property
    def runs_idx_with_sums(self) -> List[Tuple[RunIdx, int]]:
        return sorted(
            zip(
                (RunIdx(x) for x in range(self.n_runs)),
                self.tours_places_sum,
            ),
            key=lambda x: x[1],
        )

    @property
    def big_skating_table(self) -> Tuple[Matrix[int], Matrix[int]]:
        all_scores_mat = Matrix.hstack([
            tour.judges_places_table for tour in self.tours
        ])
        return SkatingSystemTour.compute_skating_table(all_scores_mat)

    @property
    def big_skating_primary(self) -> Matrix[int]:
        return self.big_skating_table[0]

    @property
    def big_skating_secondary(self) -> Matrix[int]:
        return self.big_skating_table[1]

    @property
    def ec_skating_table(self) -> Tuple[Matrix[frac], Matrix[frac]]:
        all_places_mat = Matrix.hstack([
            tour.places_matrix for tour in self.tours
        ])
        return SkatingSystemTour.compute_skating_table(all_places_mat)

    @property
    def ec_skating_primary(self) -> Matrix[frac]:
        return self.ec_skating_table[0]

    @property
    def ec_skating_secondary(self) -> Matrix[frac]:
        return self.ec_skating_table[1]

    @property
    def initial_groups(self) -> List[List[RunIdx]]:
        # Groups after applying rule 9
        result: List[List[RunIdx]] = []
        buf: List[RunIdx] = []
        latest_sum: Optional[int] = None
        for run_idx, sum_ in self.runs_idx_with_sums:
            if latest_sum != sum_ and len(buf) > 0:
                result.append(buf)
                buf = []
            buf.append(run_idx)
            latest_sum = sum_
        if len(buf) > 0:
            result.append(buf)
        return result

    def resolve_group(self, group: List[RunIdx], place: int) -> Generator[List[RunIdx], None, None]:
        # Applies rules 10 and 11 for a group of runs for the same place
        if len(group) == 1:
            yield group
            return
        runs_with_keys: List[Tuple[RunIdx, List[Union[int, frac]]]] = []
        for run_idx in group:
            key: List[Union[int, frac]] = []
            key += [
                -self.ec_skating_primary[run_idx, place - 1],
                self.ec_skating_secondary[run_idx, place - 1]
            ]
            for place_minus_one in range(place - 1, self.n_runs):
                key += [
                    -self.big_skating_primary[run_idx, place_minus_one],
                    self.big_skating_secondary[run_idx, place_minus_one],
                ]
            runs_with_keys.append((run_idx, key))
        runs_with_keys.sort(key=lambda x: x[1])
        for idx in range(1, len(runs_with_keys)):
            if runs_with_keys[idx - 1][1] != runs_with_keys[idx][1]:
                yield sorted(run_idx for run_idx, _ in runs_with_keys[:idx])  # Return group of same place
                yield from self.resolve_group(
                    [run_idx for run_idx, _ in runs_with_keys[idx:]],
                    place + idx,
                )  # Resolve the rest
                break
        else:
            yield [run for run, _ in runs_with_keys]  # Unable to resolve

    def order_runs(self) -> Generator[List[RunIdx], None, None]:
        place = 1
        for group in self.initial_groups:
            yield from self.resolve_group(group, place)
            place += len(group)

    @property
    def places(self) -> List[int]:
        result: List[int] = [0] * self.n_runs
        place = 1
        for runs_idx in self.order_runs():
            for idx in runs_idx:
                result[idx] = place
            place += len(runs_idx)
        return result

    @property
    def big_skating_rows(self) -> List[List[Tuple[int, int]]]:
        return [
            [
                (
                    self.big_skating_primary[row, col],
                    self.big_skating_secondary[row, col],
                )
                for col in range(self.n_runs)
            ]
            for row in range(self.n_runs)
        ]

    @property
    def ec_skating_rows(self) -> List[List[Tuple[frac, frac]]]:
        return [
            [
                (
                    self.ec_skating_primary[row, col],
                    self.ec_skating_secondary[row, col],
                )
                for col in range(self.n_runs)
            ]
            for row in range(self.n_runs)
        ]
