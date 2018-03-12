from fractions import Fraction as frac
from typing import Any, Callable, Dict, List, Type, Optional

from .common import CachedClass
from ..types import JudgeRole, ScoreId, ScoreRawData, ScoringSystemName, TotalScoreType, AcroScore


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

    total_score: TotalScoreType

    def _total_score(self) -> TotalScoreType:
        raise NotImplementedError

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        raise NotImplementedError


    user_data: ScoreRawData

    def _user_data(self) -> ScoreRawData:
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

    counting_score: ScoreRawData

    def _counting_score(self) -> ScoreRawData:
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

    def _total_score(self) -> TotalScoreType:
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

    def _total_score(self) -> TotalScoreType:
        return self.counting_score["bonus"]

    @staticmethod
    def check_is_completed(user_data: ScoreRawData) -> bool:
        return True


class ScoreContextNull(ScoreContextBase):
    DEFAULT_SCORES = {}
    INITIAL_SCORES = {}
    SCORES_VALIDATORS = {}

    def _total_score(self):
        return ""
