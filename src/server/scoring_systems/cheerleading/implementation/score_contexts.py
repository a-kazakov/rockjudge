from dataclasses import dataclass
from fractions import Fraction
from typing import Optional, TYPE_CHECKING, Type, Callable, Any, Dict

from scoring_systems.base import (
    ScoreInfo,
    JudgeRole,
    ScoringSystemName,
    ScoreRawData,
    ScoreResult,
)
from scoring_systems.cheerleading.implementation.common import (
    CachedClass,
    float_to_frac,
)

if TYPE_CHECKING:
    from scoring_systems.cheerleading.implementation.tour_contexts import TourContext


def make_validate_number(
    min_value: int = 0,
    max_value: int = 10,
    allow_halves: bool = False,
    allow_none: bool = False,
) -> Callable[[Any], bool]:
    def validate_number(value: Any) -> bool:
        if value is None:
            return allow_none
        if not isinstance(value, (int, float)):
            return False
        denominator = 50 if allow_halves else 100
        if round(value * 100) % denominator != 0:
            return False
        if not (min_value - 1e-5 < value < max_value + 1e-5):
            return False
        return True

    return validate_number


@dataclass(frozen=True)
class FieldDescrpitorBase:
    default_value: Any = None
    initial_value: Any = None
    validator: Callable[[Any], bool] = lambda _: True


def make_number_field(max_value: int = 10):
    return FieldDescrpitorBase(
        default_value=0,
        initial_value=None,
        validator=make_validate_number(
            max_value=max_value, allow_halves=True, allow_none=True
        ),
    )


class ScoreContextBase(CachedClass):
    FIELDS: Dict[str, FieldDescrpitorBase]

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
        self.tour_context: Optional["TourContext"] = None

    @staticmethod
    def get_class(
        judge_role: JudgeRole, scoring_system_name: ScoringSystemName
    ) -> Type["ScoreContextBase"]:
        if judge_role == "dance_judge":
            if scoring_system_name == "jazz_group":
                return ScoreContextJazzGroup
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
        cls, score_info: ScoreInfo, tour_context: "TourContext"
    ) -> "ScoreContextBase":
        db_data = score_info.data
        judge_role = tour_context.tour_request.judge_roles[score_info.judge_id]
        result = cls.make_from_data(
            db_data, judge_role, tour_context.scoring_system_name
        )
        result.score_info = score_info
        result.tour_context = tour_context
        return result

    @property
    def total_score_str(self) -> str:
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
                key: (
                    self.db_data[key]
                    if key in self.db_data and desc.validator(self.db_data[key])
                    else desc.initial_value
                )
                for key, desc in self.FIELDS.items()
            }
        )

    @property
    def counting_score(self) -> ScoreRawData:
        return ScoreRawData(
            {
                key: (value if value is not None else self.FIELDS[key].default_value)
                for key, value in self.user_data.items()
            }
        )

    @property
    def result(self) -> ScoreResult:
        return ScoreResult(
            is_valid=self.is_valid,
            total_score_str=self.total_score_str,
            extra_data=self.extra_data,
        )


class ScoreContextDanceJudge(ScoreContextBase):
    @property
    def total_score(self) -> Fraction:
        return sum(map(float_to_frac, self.counting_score.values()))

    @property
    def total_score_str(self) -> str:
        return "{:.1f}".format(float(self.total_score))

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {
            "parts": self.user_data,
            # "place": raise_if_none(self.tour_context).place_by_score_id[
            #     self.score_info.score_id
            # ],
        }


class ScoreContextJazzGroup(ScoreContextDanceJudge):
    FIELDS = {
        "tech_execution": make_number_field(10),
        "tech_control": make_number_field(10),
        "tech_style": make_number_field(10),
        "group_sync": make_number_field(10),
        "group_similarity": make_number_field(10),
        "group_position": make_number_field(10),
        "choreography_art": make_number_field(10),
        "choreography_performance": make_number_field(10),
        "choreography_complexity": make_number_field(10),
        "impression": make_number_field(10),
    }


class ScoreContextNull(ScoreContextBase):
    FIELDS = {}

    @property
    def total_score_str(self) -> str:
        return ""
