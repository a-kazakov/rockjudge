from abc import ABCMeta, abstractmethod
from typing import Any, Dict, List, NamedTuple, NewType, Optional, Union

from enums import RunStatus


# Scalar types

JudgeId = NewType("JudgeId", int)
TourId = NewType("TourId", int)
RunId = NewType("RunId", int)
ParticipantId = NewType("ParticipantId", int)
ScoreId = NewType("ScoreId", int)

AcroScore = NewType("AcroScore", float)
JudgeRole = NewType("JudgeRole", str)
ScoreRawData = NewType("ScoreRawData", Dict[str, Any])
ScoringSystemName = NewType("ScoringSystemName", str)


# Request types


class ScoreInfo(NamedTuple):
    score_id: ScoreId
    judge_id: JudgeId
    data: Dict[str, Any]


class RunInfo(NamedTuple):
    run_id: RunId
    participant_id: ParticipantId
    status: RunStatus
    acro_scores: List[AcroScore]
    scores: List[ScoreInfo]


class TourComputationRequest(NamedTuple):
    tour_id: TourId
    judge_roles: Dict[JudgeId, JudgeRole]
    num_advances: int
    hope_tour: bool
    runs: List[RunInfo]
    inherited_data: Any


# Result types


class RunResult(NamedTuple):
    total_score_str: str
    extra_data: Dict[str, Any]
    place: Optional[int]
    advanced: bool

    def serialize(self) -> Dict[str, Any]:
        return self._asdict()


class ScoreResult(NamedTuple):
    is_valid: bool
    total_score_str: str
    extra_data: Dict[str, Any]

    def serialize(self) -> Dict[str, Any]:
        return self._asdict()


class JudgeResult(NamedTuple):
    has_valid_scores: bool
    extra_data: Dict[str, Any]

    def serialize(self) -> Dict[str, Any]:
        return self._asdict()


class TourComputationResult(NamedTuple):
    extra_data: Dict[str, Any]
    inherited_data: Any
    results_order: List[RunId]
    runs_results: Dict[RunId, RunResult]
    scores_results: Dict[ScoreId, ScoreResult]
    judges_results: Dict[JudgeId, JudgeResult]

    def serialize(self) -> Dict[str, Any]:
        return {
            "extra_data": self.extra_data,
            "results_order": self.results_order,
            "runs_results": {
                run_id: result.serialize()
                for run_id, result in self.runs_results.items()
            },
            "scores_results": {
                score_id: result.serialize()
                for score_id, result in self.scores_results.items()
            },
            "judges_results": {
                judge_id: result.serialize()
                for judge_id, result in self.judges_results.items()
            },
        }


# Other types


class JudgeRolePermissions(NamedTuple):
    can_update_tour: bool
    can_update_run_status: bool


# Base class


class RulesSetMetadata(NamedTuple):
    name: str
    code: str
    scoring_systems: List[str]
    supported_languages: List[str]
    judges_roles: List[str]


class BaseScoringSystem(metaclass=ABCMeta):
    @classmethod
    @abstractmethod
    def get_rules_set_metadata(cls) -> RulesSetMetadata:
        pass

    @abstractmethod
    def init(self, scoring_system_name: str) -> None:
        pass

    @abstractmethod
    def filter_score_component(
        self, judge_role: str, key: str, value: Any, prev_value: Any
    ) -> Any:
        pass

    @abstractmethod
    def get_full_score_data(
        self, judge_role: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_judge_role_permissions(
        self, judge_role: Optional[str]
    ) -> JudgeRolePermissions:
        pass

    @abstractmethod
    def compute_tour(self, request: TourComputationRequest) -> TourComputationResult:
        pass
