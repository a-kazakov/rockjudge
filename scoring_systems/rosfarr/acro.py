import tornado.gen

from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


def get_tour_results(tour):
    return TourScores(tour, acro=True).get_results()


def get_run_scores(run, judges=None):
    return RunScore(run, judges=judges, acro=True).serialize()


def serialize_score(score, judge=None):
    return ScoreWrapper(score, judge=judge, acro=True).serialize()


@tornado.gen.coroutine
def update_score(score, client_data):
    yield ScoreWrapper(score, acro=True).update(client_data)


def get_tablet_css():
    return ["tablet.less"]


def get_tablet_js():
    return ["tablet.jsx"]


def get_admin_css():
    return ["tour_admin.less"]


def get_admin_js():
    return ["tour_admin.jsx", "tour_results.jsx"]
