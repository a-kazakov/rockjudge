import math

from .score import (
    JudgeScore,
    RunScore,
    TourScores,
)


def serialize_judge_score(judge_score):
    return JudgeScore(judge_score).serialize()

def get_total_run_score(run):
    rs = RunScore(run)
    return math.floor(0.5 + rs.primary_score / rs.factor) / 100

def serialize_tour_results(tour):
    return TourScores(tour).seriailze_for_tour_results()

