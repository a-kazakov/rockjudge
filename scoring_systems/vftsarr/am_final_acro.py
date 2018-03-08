from typing import Any, Dict

from .endpoints import Endpoints
from .implementation.run_contexts import RunContextBase


class AmFinalAcroEndpoints(Endpoints):
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
        if status == "NP":
            return {
                "total_run_score": "—",
                "verbose_run_score": {
                    "fw_score": float(context.fw_total_score),
                },
            }
        return {
            "total_run_score": context.display_score,
            "verbose_run_score": {
                "card": context.card,
                "score_value": float(context.total_score),
                "bonus": context.bonus,
                "fw_score": float(context.fw_total_score),
                "acro_score": float(context.acro_total_score),
            },
        }


