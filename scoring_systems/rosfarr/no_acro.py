import tornado.gen

from .impl import (
    ScoreWrapper,
    RunScore,
    TourScores,
)


@tornado.gen.coroutine
def get_tour_results(tour):
    return (yield TourScores(tour, acro=False).get_results())


@tornado.gen.coroutine
def get_run_scores(run, judges=None):
    return (yield RunScore(run, judges=judges, acro=False).serialize())


@tornado.gen.coroutine
def serialize_score(score, judge=None):
    return (yield ScoreWrapper(score, judge=judge, acro=False).serialize())


@tornado.gen.coroutine
def update_score(score, client_data):
    yield ScoreWrapper(score, acro=False).update(client_data)


def get_tablet_css():
    return ["tablet.less"]


def get_tablet_js():
    return ["tablet.js"]


def get_admin_css():
    return ["tour_admin.less"]


def get_admin_js():
    return ["tour_admin.js", "tour_results.js"]
