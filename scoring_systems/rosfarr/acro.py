import tornado.gen

from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


@tornado.gen.coroutine
def get_tour_results(tour):
    return (yield TourScores(tour, acro=True).get_results())


@tornado.gen.coroutine
def get_run_scores(run, judges=None):
    return (yield RunScore(run, judges=judges, acro=True).serialize())


@tornado.gen.coroutine
def serialize_score(score, judge=None):
    return (yield ScoreWrapper(score, judge=judge, acro=True).serialize())


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
