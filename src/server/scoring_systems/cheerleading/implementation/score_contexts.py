from dataclasses import dataclass
from fractions import Fraction
from typing import Optional, TYPE_CHECKING, Type, Callable, Any, Dict, List

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
from utils import raise_if_none

if TYPE_CHECKING:
    from scoring_systems.cheerleading.implementation.run_contexts import RunContext
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
        self._run_context: Optional["RunContext"] = None

    @staticmethod
    def get_class(
        judge_role: JudgeRole, scoring_system_name: ScoringSystemName
    ) -> Type["ScoreContextBase"]:
        if judge_role == "dance_judge":
            if scoring_system_name == "jazz_group":
                return ScoreContextJazzGroup
            if scoring_system_name == "freestyle_group":
                return ScoreContextFreestyleGroup
            if scoring_system_name == "hiphop_group":
                return ScoreContextHiphopGroup
            if scoring_system_name == "couple":
                return ScoreContextCouple
            if scoring_system_name == "cl_group":
                return ScoreContextClGroup
        if judge_role == "tech_judge":
            return ScoreContextTechJudge
        if judge_role == "head_judge":
            return ScoreContextHeadJudge
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
        cls, score_info: ScoreInfo, run_context: "RunContext"
    ) -> "ScoreContextBase":
        db_data = score_info.data
        judge_role = run_context.tour_context.tour_request.judge_roles[
            score_info.judge_id
        ]
        result = cls.make_from_data(
            db_data, judge_role, run_context.tour_context.scoring_system_name
        )
        result.score_info = score_info
        result._run_context = run_context
        return result

    @property
    def run_context(self) -> "RunContext":
        return raise_if_none(self._run_context)

    @property
    def tour_context(self) -> "TourContext":
        return self.run_context.tour_context

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


class ScoreContextTechJudge(ScoreContextBase):
    FIELDS = {
        "time": FieldDescrpitorBase(
            default_value=0,
            initial_value=0,
            validator=make_validate_number(max_value=24 * 60 * 60, allow_none=True),
        ),
        "time_penalty": FieldDescrpitorBase(
            default_value=0, initial_value=0, validator=lambda x: x in {0, -1, -3}
        ),
        "music_violated": FieldDescrpitorBase(
            default_value=False,
            initial_value=False,
            validator=lambda x: isinstance(x, bool),
        ),
        "entry_exit_violated": FieldDescrpitorBase(
            default_value=False,
            initial_value=False,
            validator=lambda x: isinstance(x, bool),
        ),
        "dress_violated": FieldDescrpitorBase(
            default_value=False,
            initial_value=False,
            validator=lambda x: isinstance(x, bool),
        ),
        "cheer_block_violated": FieldDescrpitorBase(
            default_value=False,
            initial_value=False,
            validator=lambda x: isinstance(x, bool),
        ),
        "accessories_violated": FieldDescrpitorBase(
            default_value=False,
            initial_value=False,
            validator=lambda x: isinstance(x, bool),
        ),
        "complexity_violations": FieldDescrpitorBase(
            default_value=0, initial_value=0, validator=make_validate_number(0, 100)
        ),
        "other_penalties": FieldDescrpitorBase(
            default_value=0, initial_value=0, validator=make_validate_number(0, 100)
        ),
    }

    @property
    def total_score(self) -> int:
        return Fraction(sum(self.normalized_data.values(), 0))

    @property
    def total_score_str(self) -> str:
        return str(self.total_score)

    @property
    def normalized_data(self) -> Dict[str, int]:
        result: Dict[str, int] = {}
        for key, value in self.counting_score.items():
            if key == "time":
                pass
            elif key.endswith("_penalty"):
                result[key] = value
            elif key == "other_penalties":
                result[key] = -int(value)
            else:
                result[key] = -5 * int(value)
        return result

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {"parts": self.user_data}


class ScoreContextHeadJudge(ScoreContextBase):
    FIELDS = {
        "bonus": FieldDescrpitorBase(
            default_value=0, initial_value=0, validator=make_validate_number(-10, 10)
        )
    }

    @property
    def total_score(self) -> int:
        return self.counting_score["bonus"]

    @property
    def total_score_str(self) -> str:
        return str(self.total_score)

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {"parts": self.user_data}


class ScoreContextDanceJudge(ScoreContextBase):
    @property
    def total_score(self) -> Fraction:
        return sum(map(float_to_frac, self.counting_score.values()))

    @property
    def total_score_with_penalty(self) -> Fraction:
        return self.total_score + self.run_context.penalty

    @property
    def total_score_str(self) -> str:
        return "{:.1f}".format(float(self.total_score))

    @property
    def judge_place(self) -> int:
        return raise_if_none(self.tour_context).judges_places_by_score_id.get(
            self.score_info.score_id
        )

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {"parts": self.user_data, "place": self.judge_place}


class ScoreContextJazzGroup(ScoreContextDanceJudge):
    FIELDS = {
        "tech_execution": make_number_field(10),
        "tech_control_stretching": make_number_field(10),
        "tech_style_power": make_number_field(10),
        "group_sync": make_number_field(10),
        "group_similarity": make_number_field(10),
        "group_position": make_number_field(10),
        "choreography_art": make_number_field(10),
        "choreography_performance_effects": make_number_field(10),
        "choreography_complexity": make_number_field(10),
        "impression_art": make_number_field(10),
    }


class ScoreContextFreestyleGroup(ScoreContextDanceJudge):
    FIELDS = {
        "tech_pompon": make_number_field(10),
        "tech_dance": make_number_field(10),
        "tech_execution": make_number_field(10),
        "group_sync": make_number_field(10),
        "group_similarity": make_number_field(10),
        "group_position": make_number_field(10),
        "choreography_art": make_number_field(10),
        "choreography_performance_effects": make_number_field(10),
        "choreography_complexity": make_number_field(10),
        "impression_art": make_number_field(10),
    }


class ScoreContextHiphopGroup(ScoreContextDanceJudge):
    FIELDS = {
        "tech_power": make_number_field(10),
        "tech_control": make_number_field(10),
        "tech_execution_sport": make_number_field(10),
        "group_sync": make_number_field(10),
        "group_similarity": make_number_field(10),
        "group_position": make_number_field(10),
        "choreography_art": make_number_field(10),
        "choreography_performance_effects": make_number_field(10),
        "choreography_complexity": make_number_field(10),
        "impression_art": make_number_field(10),
    }


class ScoreContextCouple(ScoreContextDanceJudge):
    FIELDS = {
        "tech_fulfillment": make_number_field(10),
        "tech_control": make_number_field(10),
        "tech_power": make_number_field(10),
        "tech_stretching": make_number_field(10),
        "choreography_musicality": make_number_field(10),
        "choreography_complexity": make_number_field(10),
        "choreography_style": make_number_field(10),
        "choreography_performance": make_number_field(10),
        "group_sync": make_number_field(10),
        "impression_art": make_number_field(10),
    }


class ScoreContextClGroup(ScoreContextDanceJudge):
    FIELDS = {
        "cheer_block": make_number_field(10),
        "stunts": make_number_field(25),
        "pyramids": make_number_field(25),
        "tosses": make_number_field(15),
        "acrobatics": make_number_field(10),
        "continuity": make_number_field(5),
        "impression": make_number_field(10),
    }


class ScoreContextNull(ScoreContextBase):
    FIELDS = {}

    @property
    def total_score_str(self) -> str:
        return ""
