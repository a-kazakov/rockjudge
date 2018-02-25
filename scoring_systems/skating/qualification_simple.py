from fractions import Fraction as frac
from typing import Any, Dict, List

from scoring_systems.skating.implementation.run_contexts import RunContextQualification
from scoring_systems.skating.implementation.score_contexts import ScoreContextBase
from scoring_systems.skating.implementation.tour_contexts import TourContextQualification
from scoring_systems.skating.types import (
    AcroScore,
    JudgeId,
    JudgeRole,
    RunId,
    RunInfo,
    RunStatus,
    ScoreId,
    ScoreRawData,
    ScoringSystemName,
    TourName,
)


SS_NAME = "qualification_simple"


def get_tour_results(
    runs: List[Dict[str, RunInfo]],
    judges_roles: List[JudgeRole],
    num_advances: int,
    tour_name: TourName,
) -> List[Dict[str, Any]]:
    context = TourContextQualification(
        run_infos=runs,
        judges_roles=judges_roles,
        num_advances=num_advances,
        tour_name=tour_name,
        scoring_system_name=SS_NAME,
    )
    return context.results


def get_run_scores(
    run_id: RunId,
    scores_ids: List[ScoreId],
    scores: List[ScoreRawData],
    judges_ids: List[JudgeId],
    judges_roles: List[JudgeRole],
    acro_scores: List[AcroScore],
    inherited_data: Any,
    status: RunStatus,
    tour_name: TourName,
) -> Dict[str, Any]:
    if status != "OK":
        return {
            "total_run_score": "—",
            "verbose_run_score": {},
        }
    context = RunContextQualification(
        run_id=RunContextQualification,
        scores_ids=scores_ids,
        raw_scores=scores,
        judges_roles=judges_roles,
        acro_scores=acro_scores,
        inherited_data=inherited_data,
        status=status,
        tour_name=tour_name,
        scoring_system_name=SS_NAME,
    )
    return {
        "total_run_score": context.display_score,
        "verbose_run_score": {
            "crosses": context.crosses_count,
            "bonus": context.bonus,
        },
    }


def serialize_score(
    score_id: ScoreId,
    score_data: ScoreRawData,
    judge_role: JudgeRole,
    acro_scores: AcroScore,
) -> Dict[str, Any]:
    context = ScoreContextBase.make(
        score_id=score_id,
        raw_data=score_data,
        judge_role=judge_role,
        acro_scores=acro_scores,
        scoring_system_name=SS_NAME,
    )
    return {
        "raw_data": context.user_data,
        "total_score": (float(context.total_score)
                        if type(context.total_score) is frac
                        else context.total_score),
    }


def get_updated_score(
    score_id: ScoreId,
    score_data: ScoreRawData,
    judge_role: JudgeRole,
    client_data: ScoreRawData,
) -> None:
    context = ScoreContextBase.make(
        score_id=score_id,
        raw_data=score_data,
        judge_role=judge_role,
        acro_scores=None,
        scoring_system_name=SS_NAME,
    )
    context.update(client_data)
    return context.db_data


def get_run_data_to_inherit(
    run_id: RunId,
    scores_ids: List[ScoreId],
    scores: List[ScoreRawData],
    judges_roles: List[JudgeRole],
    acro_scores: List[AcroScore],
    inherited_data: Any,
    status: RunStatus,
    tour_name: TourName,
) -> Any:
    context = RunContextQualification(
        run_id=run_id,
        scores_ids=scores_ids,
        raw_scores=scores,
        judges_roles=judges_roles,
        acro_scores=acro_scores,
        inherited_data=inherited_data,
        status=status,
        tour_name=tour_name,
        scoring_system_name=SS_NAME,
    )
    return context.data_to_inherit
