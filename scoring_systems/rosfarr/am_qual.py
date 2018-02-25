from fractions import Fraction as frac

from .implementation.tour_contexts import TourContextNjs
from .implementation.run_contexts import RunContextNjsAcro
from .implementation.score_contexts import ScoreContextBase


SS_NAME = "am_qual"


def get_tour_results(runs, judges_roles, num_advances, tour_name):
    context = TourContextNjs(
        run_infos=runs,
        judges_roles=judges_roles,
        num_advances=num_advances,
        tour_name=tour_name,
        scoring_system_name=SS_NAME,
    )
    return context.results


def get_run_scores(run_id, scores_ids, scores, judges_ids, judges_roles, acro_scores, inherited_data, status, tour_name):
    if status != "OK":
        return {
            "total_run_score": "—",
            "verbose_run_score": {},
        }
    context = RunContextNjsAcro(
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
    return {
        "total_run_score": context.display_score,
        "verbose_run_score": {
            "card": context.card,
            "primary_score": float(context.first_score),
            "secondary_score": float(context.second_score),
            "nexttour": context.nexttour_mark,
        },
    }


def serialize_score(score_id, score_data, judge_role, acro_scores):
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


def get_updated_score(score_id, score_data, judge_role, client_data):
    context = ScoreContextBase.make(
        score_id=score_id,
        raw_data=score_data,
        judge_role=judge_role,
        acro_scores=None,
        scoring_system_name=SS_NAME,
    )
    context.update(client_data)
    return context.db_data


def get_run_data_to_inherit(run_id, scores_ids, scores, judges_roles, acro_scores, inherited_data, status, tour_name):
    context = RunContextNjsAcro(
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
