from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


def get_tour_results(tour):
    return TourScores(tour, scoring_system="rosfarr.acro").get_results()


def get_run_scores(run, discipline_judges=None):
    return RunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.acro").serialize()


def serialize_score(score, discipline_judge=None):
    return ScoreWrapper(score, discipline_judge=discipline_judge, scoring_system="rosfarr.acro").serialize()


def update_score(score, client_data):
    ScoreWrapper(score, scoring_system="rosfarr.acro").update(client_data)


def get_run_data_to_inherit(run, discipline_judges=None):
    return RunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.acro") \
        .serialize_data_to_inherit()
