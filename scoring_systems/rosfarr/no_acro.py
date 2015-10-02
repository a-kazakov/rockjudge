from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


def get_tour_results(tour):
    return TourScores(tour, acro=False).get_results()


def get_run_scores(run, judges=None):
    return RunScore(run, judges=judges, acro=False).serialize()


def serialize_score(score, judge=None):
    return ScoreWrapper(score, judge=judge, acro=False).serialize()


def update_score(score, client_data):
    ScoreWrapper(score, acro=False).update(client_data)


def get_tablet_css():
    return ["tablet.less"]


def get_tablet_js():
    return ["tablet.jsx"]


def get_admin_css():
    return ["tour_admin.less"]


def get_admin_js():
    return ["tour_admin.jsx", "tour_results.jsx"]
