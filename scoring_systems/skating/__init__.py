from typing import Any, Dict, Optional

from scoring_systems import BaseScoringSystem
from scoring_systems.base import (
    JudgeRole,
    JudgeRolePermissions,
    RulesSetMetadata,
    ScoringSystemName,
    TourComputationRequest,
    TourComputationResult,
)
from scoring_systems.skating.implementation.score_contexts import ScoreContextBase
from scoring_systems.skating.implementation.tour_contexts import TourContextBase


class SkatingScoringSystem(BaseScoringSystem):
    META = RulesSetMetadata(
        name="Скейтинг система",
        code="skating",
        scoring_systems=[
            "qualification_simple",
            "final_simple",
            "final_summary",
            "final_3d",
        ],
        supported_languages=["ru"],
        judges_roles=[
            "head_judge",
            "dance_judge",
        ],
    )

    @classmethod
    def get_rules_set_metadata(cls) -> RulesSetMetadata:
        return cls.META

    def init(self, scoring_system_name: str) -> None:
        self.scoring_system_name = ScoringSystemName(scoring_system_name)

    def filter_score_component(self, judge_role: str, key: str, value: Any, prev_value: Any) -> Any:
        ctx = ScoreContextBase.make_from_data(
            {key: value},
            JudgeRole(judge_role),
            self.scoring_system_name,
        )
        return ctx.user_data[key]

    def get_full_score_data(self, judge_role: str, data: Dict[str, Any]) -> Dict[str, Any]:
        ctx = ScoreContextBase.make_from_data(
            data,
            JudgeRole(judge_role),
            self.scoring_system_name,
        )
        return ctx.user_data

    def get_judge_role_permissions(self, judge_role: Optional[str]) -> JudgeRolePermissions:
        if judge_role in ("head_judge", None):
            return JudgeRolePermissions(True, True)
        return JudgeRolePermissions(False, False)

    def compute_tour(self, request: TourComputationRequest) -> TourComputationResult:
        ctx = TourContextBase.make(request, self.scoring_system_name)
        return ctx.result
