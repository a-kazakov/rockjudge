import hashlib
import json
import logging
import time

import tornado.gen
import tornado.web

import scoring_systems
import settings
from api import (
    Api,
    ApiRequest,
)
from log import log_api
from models import (
    Client,
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
            settings=settings,
        )


class AutoPrinterHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        competition = Competition.get(Competition.id == competition_id)
        return self.render(
            "auto_printer.html",
            competition_id=competition_id,
            rules_set=competition.rules_set,
            settings=settings,
        )


class CompetitionsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(
            "competitions.html",
            rules_sets=json.dumps(scoring_systems.get_rules_sets_names()),
            settings=settings,
        )


# class ConnectionTesterHandler(tornado.web.RequestHandler):
#     def get(self):
#         self.render(
#             "connection_tester.html",
#             settings=settings,
#         )


class JudgeHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        judge = Judge.select().where(Judge.id == judge_id).get()
        return self.render(
            "judge.html",
            judge_id=judge_id,
            competition_id=judge.competition_id,
            rules_set=judge.competition.rules_set,
            settings=settings,
        )


class PresenterHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "presenter.html",
            competition_id=competition_id,
            settings=settings,
        )


class ScreenHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "screen.html",
            competition_id=competition_id,
            manifest=json.load(open("screen/manifest.json", "rt", encoding="utf-8-sig")),
            settings=settings,
        )


class ScreenOperatorHandler(tornado.web.RequestHandler):
    def get(self, competition_id):
        return self.render(
            "screen_operator.html",
            competition_id=competition_id,
            manifest=json.load(open("screen/manifest.json", "rt", encoding="utf-8-sig")),
            settings=settings,
        )


class StartPageHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(
            "start_page.html",
            settings=settings,
        )
