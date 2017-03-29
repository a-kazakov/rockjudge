from .impl import (
    ScoreWrapper,
    FormationRunScore,
    FormationTourScores,
)


def get_tour_results(tour):
    return FormationTourScores(tour, scoring_system="rosfarr.formation").get_results()


def get_run_scores(run, discipline_judges=None):
    return FormationRunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.formation").serialize()


def serialize_score(score, discipline_judge=None):
    return ScoreWrapper(score, discipline_judge=discipline_judge, scoring_system="rosfarr.formation").serialize()


def update_score(score, client_data):
    ScoreWrapper(score, scoring_system="rosfarr.formation").update(client_data)


def get_run_data_to_inherit(run, discipline_judges=None):
    return FormationRunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.formation") \
        .serialize_data_to_inherit()
