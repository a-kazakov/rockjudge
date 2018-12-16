from fractions import Fraction as frac
from typing import Any, Callable, Dict, Optional, Type, TYPE_CHECKING

from enums import RunStatus
from scoring_systems.base import (
    JudgeRole,
    ScoreInfo,
    ScoreRawData,
    ScoreResult,
    ScoringSystemName,
)
from .common import CachedClass

if TYPE_CHECKING:
    from scoring_systems.skating import TourContextBase


def float_to_frac(value: float) -> frac:
    return frac(int(round(value * 10)), 10)


def ret_false(_: Any) -> bool:
    return False


def validate_criteria(x: Any) -> bool:
    return isinstance(x, int) and 1 <= x <= 10


def validate_cross(x: Any) -> bool:
    return isinstance(x, str) and x in ("auto", "set", "not_set")


def validate_place(x: Any) -> bool:
    return isinstance(x, int) and 1 <= x <= 1000


def validate_crosses_count(x: Any) -> bool:
    return isinstance(x, int) and 1 <= x <= 100


class ScoreContextBase(CachedClass):
    DEFAULT_SCORES: Dict[str, Any]
    INITIAL_SCORES: Dict[str, Any]
    SCORES_VALIDATORS: Dict[str, Callable[[Any], bool]]

    def __init__(
        self,
        db_data: Dict[str, Any],
        judge_role: JudgeRole,
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.db_data = db_data
        self.judge_role = judge_role
        self.scoring_system_name = scoring_system_name
        self.score_info: Optional[ScoreInfo] = None
        self.tour_context: Optional["TourContextBase"] = None

    @staticmethod
    def get_class(
        judge_role: JudgeRole, scoring_system_name: ScoringSystemName
    ) -> Type["ScoreContextBase"]:
        if judge_role == "dance_judge":
            if scoring_system_name == "qualification_simple":
                return ScoreContextDanceSimpleQualification
            if scoring_system_name == "final_simple":
                return ScoreContextDanceSimpleFinal
            if scoring_system_name == "final_3d":
                return ScoreContextDance3dFinal
        if judge_role == "head_judge":
            return ScoreContextHeadQualification
        return ScoreContextNull

    @classmethod
    def make_from_data(
        cls,
        db_data: Dict[str, Any],
        judge_role: JudgeRole,
        scoring_system_name: ScoringSystemName,
    ) -> "ScoreContextBase":
        final_cls = cls.get_class(judge_role, scoring_system_name)
        return final_cls(db_data, judge_role, scoring_system_name)

    @classmethod
    def make_from_request(
        cls,
        score_info: ScoreInfo,
        tour_context: "TourContextBase",
        scoring_system_name: ScoringSystemName,
    ) -> "ScoreContextBase":
        db_data = score_info.data
        judge_role = tour_context.tour_request.judge_roles[score_info.judge_id]
        result = cls.make_from_data(db_data, judge_role, scoring_system_name)
        result.score_info = score_info
        result.tour_context = tour_context
        return result

    @property
    def total_score(self) -> str:
        raise NotImplementedError

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {"parts": self.user_data}

    @property
    def is_valid(self) -> bool:
        return True

    @property
    def user_data(self) -> ScoreRawData:
        return ScoreRawData(
            {
                **self.INITIAL_SCORES,
                **{
                    key: self.db_data[key]
                    for key in self.INITIAL_SCORES
                    if key in self.db_data
                    and self.SCORES_VALIDATORS[key](self.db_data[key])
                },
            }
        )

    @property
    def counting_score(self) -> ScoreRawData:
        return ScoreRawData(
            {
                key: (value if value is not None else self.DEFAULT_SCORES[key])
                for key, value in self.user_data.items()
            }
        )

    @property
    def result(self) -> ScoreResult:
        return ScoreResult(
            is_valid=self.is_valid,
            total_score_str=self.total_score,
            extra_data=self.extra_data,
        )


class ScoreContextDanceSimpleQualification(ScoreContextBase):
    DEFAULT_SCORES = {"cross": False, "note_number": None, "note_pics": ""}
    INITIAL_SCORES = {"cross": False, "note_number": None, "note_pics": ""}
    SCORES_VALIDATORS = {
        "cross": lambda x: isinstance(x, bool),
        "note_number": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 5),
        "note_pics": lambda x: isinstance(x, str) and len(x) <= 4,
    }

    @property
    def total_score(self) -> str:
        return "X" if self.user_data["cross"] else ""


class ScoreContextDanceSimpleFinal(ScoreContextBase):
    DEFAULT_SCORES = {"place": 0}
    INITIAL_SCORES = {"place": None}
    SCORES_VALIDATORS = {
        "place": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 100)
    }

    @property
    def total_score(self) -> str:
        if self.user_data["place"] is None:
            return ""
        return str(self.user_data["place"])

    @property
    def is_valid(self) -> bool:
        if self.tour_context is None or self.score_info is None:
            return True
        runs = self.tour_context.runs
        places_count = sum(run.run_info.status == RunStatus.OK for run in runs)
        user_place = self.user_data["place"]
        if user_place is None:
            return True
        return 1 <= user_place <= places_count


class ScoreContextDance3dFinal(ScoreContextBase):
    DEFAULT_SCORES = {"tech": 0, "composition": 0, "art": 0, "place": 0}
    INITIAL_SCORES = {"tech": None, "composition": None, "art": None, "place": None}
    SCORES_VALIDATORS = {
        "tech": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "composition": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "art": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "place": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 100),
    }

    @property
    def place_prefix(self) -> str:
        place = self.user_data["place"]
        if place is None:
            return ""
        return str(f"{place} ")

    @property
    def scores_sum(self) -> int:
        return (
            self.counting_score["tech"]
            + self.counting_score["composition"]
            + self.counting_score["art"]
        )

    @property
    def total_score(self) -> str:
        return "{}({})".format(self.place_prefix, self.scores_sum)

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {**super().extra_data, "scores_sum": self.scores_sum}

    @property
    def is_valid(self) -> bool:
        if self.tour_context is None or self.score_info is None:
            return True
        runs = self.tour_context.runs
        places_count = sum(run.run_info.status == RunStatus.OK for run in runs)
        user_place = self.user_data["place"]
        if user_place is None:
            return True
        return 1 <= user_place <= places_count


class ScoreContextHeadQualification(ScoreContextBase):
    DEFAULT_SCORES = {"bonus": 0}
    INITIAL_SCORES = {"bonus": 0}
    SCORES_VALIDATORS = {"bonus": lambda x: isinstance(x, int) and -10 <= x <= 10}

    @property
    def total_score(self) -> str:
        return str(self.counting_score["bonus"])


class ScoreContextNull(ScoreContextBase):
    DEFAULT_SCORES = {}
    INITIAL_SCORES = {}
    SCORES_VALIDATORS = {}

    @property
    def total_score(self):
        return ""
