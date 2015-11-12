import json

import tornado.gen
import tornado.web

import settings
from api import Api
from db import Database
from models import (
    Competition,
    Judge,
    Tour,
)
from webserver.websocket import WsMessage


class StaticFilesHandlerNoCache(tornado.web.StaticFileHandler):
    def set_extra_headers(self, path):
        self.set_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')


class AdminHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render("admin.html", competition_id=competition_id, debug=settings.DEBUG)


class CompetitionReportHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render(
            "competition_report.html",
            competition_id=competition_id,
            debug=settings.DEBUG,
        )


class CompetitionsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("competitions.html", debug=settings.DEBUG)


class ConnectionTesterHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("connection.html", debug=settings.DEBUG)


class DisciplineResultsHandler(tornado.web.RequestHandler):
    def get(self, discipline_id):
        self.render(
            "discipline_results.html",
            discipline_id=discipline_id,
            debug=settings.DEBUG,
        )


class ManageParticipantsHandler(tornado.web.RequestHandler):
    def get(self, discipline_id):
        self.render(
            "manage_participants.html",
            discipline_id=discipline_id,
            debug=settings.DEBUG,
        )


class PresenterHandler(tornado.web.RequestHandler):
    def get(self):
        return self.render("presenter.html", debug=settings.DEBUG)


class StartListHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        self.render(
            "start_list.html",
            competition_id=competition_id,
            debug=settings.DEBUG,
        )


class StartPageHandler(tornado.web.RequestHandler):
    def get(self):
        competition_ids = [c.id for c in Competition.select().where(Competition.active == True)]  # NOQA
        self.render("start_page.html", competition_ids=competition_ids, debug=settings.DEBUG)


class TourAdminHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == tour_id).get()
        if tour.finalized:
            self.redirect("/tour/{}/results".format(tour_id))
        else:
            return self.render(
                "tour_admin.html",
                tour_id=tour_id,
                debug=settings.DEBUG,
            )


class TourResultsHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        self.render(
            "tour_results.html",
            tour_id=tour_id,
            debug=settings.DEBUG,
        )


class TabletHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        judge = Judge.select().where(Judge.id == judge_id).get()
        return self.render(
            "tablet.html",
            judge_id=judge_id,
            competition_id=judge.competition_id,
            debug=settings.DEBUG,
        )


class ApiHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.get_argument("data"))
        method = self.get_argument("method")
        try:
            client_id = self.get_argument("client_id")
        except:
            # TODO: add logging here
            client_id = None
        ws_message = WsMessage(client_id)
        result = Api.call(method, data, ws_message=ws_message)
        response = json.dumps(result, ensure_ascii=False)
        if not ws_message.empty():
            with Database.instance().db.transaction():
                ws_message.send()
        self.write(response)

    def get(self):
        self.post()
