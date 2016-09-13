import json

import tornado.gen
import tornado.web

import settings
from api import Api
from db import Database
from models import (
    Competition,
    Judge,
)
from webserver.websocket import WsMessage


class StaticFileHandlerNoCache(tornado.web.StaticFileHandler):
    def set_extra_headers(self, path):
        self.set_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')


class AdminHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        competition = Competition.get(Competition.id == competition_id)
        self.render(
            "admin.html",
            competition_id=competition_id,
            rules_set=competition.rules_set,
            debug=settings.DEBUG)


class AutoPrinterHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        competition = Competition.get(Competition.id == competition_id)
        return self.render(
            "auto_printer.html",
            competition_id=competition_id,
            rules_set=competition.rules_set,
            debug=settings.DEBUG)


class CompetitionsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(
            "competitions.html",
            debug=settings.DEBUG)


class ConnectionTesterHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(
            "connection_tester.html",
            debug=settings.DEBUG)


class JudgeHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        judge = Judge.select().where(Judge.id == judge_id).get()
        return self.render(
            "judge.html",
            judge_id=judge_id,
            competition_id=judge.competition_id,
            debug=settings.DEBUG)


class PresenterHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "presenter.html",
            competition_id=competition_id,
            debug=settings.DEBUG)


class ScreenHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "screen.html",
            competition_id=competition_id,
            manifest=json.load(open("screen/manifest.json", "rt", encoding="utf-8")),
            debug=settings.DEBUG)


class ScreenOperatorHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "screen_operator.html",
            competition_id=competition_id,
            manifest=json.load(open("screen/manifest.json", "rt", encoding="utf-8")),
            debug=settings.DEBUG)


class StartPageHandler(tornado.web.RequestHandler):
    def get(self):
        competition_ids = [c.id for c in Competition.select().where(Competition.active == True)]  # NOQA
        self.render(
            "start_page.html",
            competition_ids=competition_ids,
            debug=settings.DEBUG)


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
