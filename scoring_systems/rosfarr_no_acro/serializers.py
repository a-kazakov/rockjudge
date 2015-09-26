from .score import (
    JudgeScore,
    TourScores,
)

def serialize_judge_score(run, judge):
    return JudgeScore(run, judge).serialize()

def serialize_tour(tour):
    return TourScores(tour).serialize_for_admin()

def serialize_finalized_tour(tour):
    return TourScores(tour).seriailze_for_tour_results()
