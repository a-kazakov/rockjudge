from .impl import (
    ScoreWrapper,
    FormationRunScore,
    FormationTourScores,
)


def get_tour_results(tour):
    return FormationTourScores(tour, scoring_system="rosfarr.formation_acro").get_results()


def get_run_scores(run, discipline_judges=None):
    return FormationRunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.formation_acro").serialize()


def serialize_score(score, discipline_judge=None):
    return ScoreWrapper(score, discipline_judge=discipline_judge, scoring_system="rosfarr.formation_acro").serialize()


def update_score(score, client_data):
    ScoreWrapper(score, scoring_system="rosfarr.formation_acro").update(client_data)


def get_run_data_to_inherit(run, discipline_judges=None):
    return FormationRunScore(run, discipline_judges=discipline_judges, scoring_system="rosfarr.formation_acro") \
        .serialize_data_to_inherit()


def get_tablet_css():
    return ["tablet.less"]


def get_tablet_js():
    return ["tablet.js"]


def get_admin_css():
    return ["tour_admin.less"]


def get_admin_js():
    return ["tour_admin.js", "tour_results.js"]
