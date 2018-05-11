from fractions import Fraction as frac
from typing import Any, Callable, Dict, List, Optional, Type

from .common import CachedClass
from ..types import AcroScore, JudgeRole, ScoreId, ScoreRawData, ScoringSystemName, TotalScoreType


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
        score_id: ScoreId,
        raw_data: ScoreRawData,
        judge_role: JudgeRole,
        acro_scores: Optional[List[AcroScore]],
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.score_id = score_id
        self.db_data = raw_data
        self.judge_role = judge_role
        self.acro_scores = acro_scores
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(
        judge_role: JudgeRole,
        scoring_system_name: ScoringSystemName,
    ) -> Type["ScoreContextBase"]:
        if judge_role == "dance_judge":
            if scoring_system_name == "qualification_simple":
                return ScoreContextDanceSimpleQualification
            if scoring_system_name == "final_simple":
                return ScoreContextDanceSimpleFinal
            if scoring_system_name == "final_3d":
                return ScoreContextDance3dFinal
        if scoring_system_name == "final":
            return ScoreContextDanceSimpleQualification
        if judge_role == "head_judge":
            return ScoreContextHeadQualification
        return ScoreContextNull

    @classmethod
    def make(
        cls,
        score_id: ScoreId,
        raw_data: ScoreRawData,
        judge_role: JudgeRole,
        acro_scores: Optional[List[AcroScore]],
        scoring_system_name: ScoringSystemName,
    ) -> "ScoreContextBase":
        return cls.get_class(judge_role, scoring_system_name)(
            score_id,
            raw_data,
            judge_role,
            acro_scores,
            scoring_system_name,
        )

    @property
    def total_score(self) -> TotalScoreType:
        raise NotImplementedError

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {}

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        raise NotImplementedError


    @property
    def user_data(self) -> ScoreRawData:
        result = ScoreRawData({
            **self.INITIAL_SCORES,
            **{
                key: self.db_data[key]
                for key in self.INITIAL_SCORES
                if key in self.db_data
            },
        })
        result["completed"] = self.check_is_completed(result)
        return result

    @property
    def counting_score(self) -> ScoreRawData:
        return {
            key: (value if value is not None else self.DEFAULT_SCORES[key])
            for key, value in self.user_data.items()
        }

    def update(self, client_data: ScoreRawData) -> None:
        cleared_data = {
            key: (
                self.counting_score[key] + client_data[key]["delta"]
                if (
                    isinstance(client_data[key], dict) and
                    "delta" in client_data[key]
                ) else value
            )
            for key, value in client_data.items()
        }
        upd = {
            key: value
            for key, value in cleared_data.items()
            if self.SCORES_VALIDATORS.get(key, ret_false)(value)
        }
        self.db_data = {
            **self.db_data,
            **upd,
        }
        for attr in ("total_score", "user_data", "counting_score", ):
            if attr in self.__dict__:
                delattr(self, attr)


class ScoreContextDanceSimpleQualification(ScoreContextBase):
    DEFAULT_SCORES = {
        "cross": False,
        "note_number": None,
        "note_pics": "",
    }
    INITIAL_SCORES = {
        "cross": None,
        "note_number": None,
        "note_pics": "",
    }
    SCORES_VALIDATORS = {
        "cross": lambda x: x is None or isinstance(x, bool),
        "note_number": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 5),
        "note_pics": lambda x: isinstance(x, str) and len(x) <= 4,
    }

    @property
    def total_score(self) -> TotalScoreType:
        if self.user_data["cross"] is None:
            return ""
        return (
            "X"
            if self.user_data["cross"]
            else "-"
        )

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return user_data["cross"] is not None


class ScoreContextDanceSimpleFinal(ScoreContextBase):
    DEFAULT_SCORES = {
        "place": 0,
    }
    INITIAL_SCORES = {
        "place": None,
    }
    SCORES_VALIDATORS = {
        "place": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 100),
    }

    @property
    def total_score(self) -> TotalScoreType:
        if self.user_data["place"] is None:
            return ""
        return str(self.user_data["place"])

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return user_data["place"] is not None


class ScoreContextDance3dFinal(ScoreContextBase):
    DEFAULT_SCORES = {
        "tech": 0,
        "composition": 0,
        "art": 0,
        "place": 0,
    }
    INITIAL_SCORES = {
        "tech": None,
        "composition": None,
        "art": None,
        "place": None,
    }
    SCORES_VALIDATORS = {
        "tech": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "composition": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "art": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 10),
        "place": lambda x: x is None or (isinstance(x, int) and 1 <= x <= 100),
    }

    @property
    def place_suffix(self) -> str:
        place = self.user_data["place"]
        if place is None:
            return ""
        return str(f" ({place})")

    @property
    def scores_sum(self) -> int:
        return (
            self.counting_score["tech"] +
            self.counting_score["composition"] +
            self.counting_score["art"]
        )

    @property
    def total_score(self) -> TotalScoreType:
        return f"{self.scores_sum}{self.place_suffix}"

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {
            "scores_sum": self.scores_sum,
        }

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return all(
            user_data[field] is not None
            for field in ("tech", "composition", "art")
        )


class ScoreContextHeadQualification(ScoreContextBase):
    DEFAULT_SCORES = {
        "bonus": 0,
    }
    INITIAL_SCORES = {
        "bonus": 0,
    }
    SCORES_VALIDATORS = {
        "bonus": lambda x: isinstance(x, int) and -10 <= x <= 10,
    }

    @property
    def total_score(self) -> TotalScoreType:
        return self.counting_score["bonus"]

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return True


class ScoreContextNull(ScoreContextBase):
    DEFAULT_SCORES = {}
    INITIAL_SCORES = {}
    SCORES_VALIDATORS = {}

    @property
    def total_score(self):
        return ""

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return True
