from fractions import Fraction as frac
from typing import Any, Dict

from .implementation.run_contexts import RunContextBase
from .implementation.score_contexts import ScoreContextBase
from .implementation.tour_contexts import TourContextBase


class Endpoints:
    def __init__(self, scoring_system_name) -> None:
        self.scoring_system_name = scoring_system_name

    def get_tour_results(self, runs, judges_roles, num_advances, tour_name):
        context = TourContextBase.make(
            run_infos=runs,
            judges_roles=judges_roles,
            num_advances=num_advances,
            tour_name=tour_name,
            scoring_system_name=self.scoring_system_name,
        )
        return context.results

    def get_run_scores(
        self,
        run_id,
        scores_ids,
        scores,
        judges_ids,
        judges_roles,
        acro_scores,
        inherited_data,
        status,
        tour_name
    ) -> Dict[str, Any]:
        if status != "OK":
            return {
                "total_run_score": "—",
                "verbose_run_score": {},
            }
        context = RunContextBase.make(
            run_id=run_id,
            scores_ids=scores_ids,
            raw_scores=scores,
            judges_roles=judges_roles,
            acro_scores=acro_scores,
            inherited_data=inherited_data,
            status=status,
            tour_name=tour_name,
            scoring_system_name=self.scoring_system_name,
        )
        result = {
            "total_run_score": context.display_score,
            "verbose_run_score": {
                "bonus": context.bonus,
            },
        }
        return result

    def serialize_score(self, score_id, score_data, judge_role, acro_scores):
        context = ScoreContextBase.make(
            score_id=score_id,
            raw_data=score_data,
            judge_role=judge_role,
            acro_scores=acro_scores,
            scoring_system_name=self.scoring_system_name,
        )
        return {
            "raw_data": context.user_data,
            "total_score": (float(context.total_score)
                            if type(context.total_score) is frac
                            else context.total_score),
            **context.extra_data,
        }

    def get_updated_score(self, score_id, score_data, judge_role, client_data):
        context = ScoreContextBase.make(
            score_id=score_id,
            raw_data=score_data,
            judge_role=judge_role,
            acro_scores=None,
            scoring_system_name=self.scoring_system_name,
        )
        context.update(client_data)
        return context.db_data

    def get_run_data_to_inherit(
            self,
            run_id,
            scores_ids,
            scores,
            judges_roles,
            acro_scores,
            inherited_data,
            status,
            tour_name,
    ) -> Dict[str, Any]:
        context = RunContextBase.make(
            run_id=run_id,
            scores_ids=scores_ids,
            raw_scores=scores,
            judges_roles=judges_roles,
            acro_scores=acro_scores,
            inherited_data=inherited_data,
            status=status,
            tour_name=tour_name,
            scoring_system_name=self.scoring_system_name,
        )
        return context.data_to_inherit
