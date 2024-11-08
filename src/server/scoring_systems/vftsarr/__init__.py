from typing import Any, Dict, Optional

from scoring_systems.base import (
    BaseScoringSystem,
    JudgeRolePermissions,
    RulesSetMetadata,
    TourComputationRequest,
    TourComputationResult,
)
from scoring_systems.vftsarr.implementation.score_contexts import ScoreContextBase
from scoring_systems.vftsarr.implementation.tour_contexts import TourContext


class VftsarrScoringSystem(BaseScoringSystem):
    META = RulesSetMetadata(
        name="ФТСАРР",
        code="vftsarr",
        scoring_systems=[
            "am_final_acro",
            "am_final_fw",
            "am_qual",
            "formation",
            "formation_acro",
            "formation_simplified",
            "acro",
            "acro_extended",
            "dance_extended",
            "dance",
            "dance_rough",
            "simplified",
            "solo",
            "solo_rough",
            "solo_final_spb",
        ],
        supported_languages=["ru"],
        judges_roles=["head_judge", "dance_judge", "acro_judge", "tech_judge"],
    )

    @classmethod
    def get_rules_set_metadata(cls) -> RulesSetMetadata:
        return cls.META

    def init(self, scoring_system_name: str) -> None:
        self.scoring_system_name = scoring_system_name

    def filter_score_component(
        self, judge_role: str, key: str, value: Any, prev_value: Any
    ) -> Any:
        ctx = ScoreContextBase.make_from_data(
            {key: value}, judge_role, self.scoring_system_name, []
        )
        return ctx.user_data[key]

    def get_full_score_data(
        self, judge_role: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        ctx = ScoreContextBase.make_from_data(
            data, judge_role, self.scoring_system_name, []
        )
        return ctx.user_data

    def get_judge_role_permissions(
        self, judge_role: Optional[str]
    ) -> JudgeRolePermissions:
        if judge_role in ("head_judge", None):
            return JudgeRolePermissions(True, True)
        return JudgeRolePermissions(False, False)

    def compute_tour(self, request: TourComputationRequest) -> TourComputationResult:
        ctx = TourContext(request, self.scoring_system_name)
        return ctx.result
