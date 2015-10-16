from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


def get_tour_results(tour):
    return TourScores(tour, scoring_system="rosfarr.no_acro").get_results()


def get_run_scores(run, judges=None):
    return RunScore(run, judges=judges, scoring_system="rosfarr.no_acro").serialize()


def serialize_score(score, judge=None):
    return ScoreWrapper(score, judge=judge, scoring_system="rosfarr.no_acro").serialize()


def update_score(score, client_data):
    ScoreWrapper(score, scoring_system="rosfarr.no_acro").update(client_data)


def get_tablet_css():
    return ["tablet.less"]


def get_tablet_js():
    return ["tablet.js"]


def get_admin_css():
    return ["tour_admin.less"]


def get_admin_js():
    return ["tour_admin.js", "tour_results.js"]
