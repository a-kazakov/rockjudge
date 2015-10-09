import json
import time

import tornado.gen
import tornado.web

from db import Database
from tournaments.api import Api as TournamentsApi
from tournaments.models import (
    Judge,
    Tour,
)


class AdminHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render("admin.html", competition_id=competition_id)


class TourAdminHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == tour_id).get()
        if tour.finalized:
            self.redirect("/tour/{}/results".format(tour_id))
        else:
            return self.render(
                "tour_admin.html",
                tour_id=tour_id,
            )


class TourResultsHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        self.render(
            "tour_results.html",
            tour_id=tour_id,
        )


class TabletHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        judge = Judge.select().where(Judge.id == judge_id).get()
        return self.render(
            "tablet.html",
            judge_id=judge_id,
            competition_id=judge.competition_id,
        )


class ApiHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def post(self):
        begin = time.time()
        data = json.loads(self.get_argument("data"))
        method = self.get_argument("method")
        method_parts = method.split(".")
        inner_method = ".".join(method_parts[1:])
        with Database.instance().db.transaction():
            if method_parts[0] == "tournaments":
                result = yield TournamentsApi.call(inner_method, data)
                self.write(json.dumps(result))
            else:
                self.write(json.dumps({
                    "success": False,
                    "message": "Unknown method name: {}".format(method)
                }))
        print("Api call: {} ({:.3f}s)".format(method, time.time() - begin))

    @tornado.gen.coroutine
    def get(self):
        yield self.post()
