import json
import time
import traceback

import tornado.gen
import tornado.web

from db import Database
from logger import log_api
from tournaments.api import Api as TournamentsApi
from tournaments.models import (
    Competition,
    Judge,
    Tour,
)
from webserver.websocket import WsMessage


class AdminHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render("admin.html", competition_id=competition_id)


class CompetitionReportHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render(
            "competition_report.html",
            competition_id=competition_id,
        )


class InnerCompetitionResultsHandler(tornado.web.RequestHandler):
    def get(self, inner_competition_id):
        self.render(
            "inner_competition_results.html",
            inner_competition_id=inner_competition_id,
        )


class ManageParticipantsHandler(tornado.web.RequestHandler):
    def get(self, inner_competition_id):
        self.render(
            "manage_participants.html",
            inner_competition_id=inner_competition_id,
        )


class PresenterHandler(tornado.web.RequestHandler):
    def get(self):
        return self.render("presenter.html")


class StartListHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render(
            "start_list.html",
            competition_id=competition_id,
        )

class StartPageHandler(tornado.web.RequestHandler):
    def get(self):
        competition_ids = [c.id for c in Competition.select()]
        self.render("start_page.html", competition_ids=competition_ids)


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
    def post(self):
        try:
            begin = time.time()
            data = None
            response = None
            data = json.loads(self.get_argument("data"))
            method = self.get_argument("method")
            method_parts = method.split(".")
            inner_method = ".".join(method_parts[1:])
            try:
                client_id = self.get_argument("client_id")
            except:
                # TODO: add logging here
                client_id = None
            ws_message = WsMessage(client_id)
            with Database.instance().db.transaction():
                if method_parts[0] == "tournaments":
                    result = TournamentsApi.call(inner_method, data, ws_message=ws_message)
                    response = json.dumps(result)
                else:
                    response = json.dumps({
                        "success": False,
                        "message": "Unknown method name: {}".format(method)
                    })
            if not ws_message.empty():
                with Database.instance().db.transaction():
                    ws_message.send()
            self.write(response)
            ex_str = None
        except Exception as ex:
            ex_str = traceback.format_exc()
            raise ex
        finally:
            total_time = time.time() - begin
            log_api(
                time=begin,
                latency=total_time,
                method=method,
                request=data,
                exception=ex_str,
                response=response)
            print("Api call: {} ({:.3f}s)".format(method, total_time))

    def get(self):
        self.post()
