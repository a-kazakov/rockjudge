import hashlib
import json

import tornado.gen
import tornado.web

import scoring_systems
import settings
from api import Api
from db import Database
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


class ApiRequest:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)


class ApiHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.get_argument("data"))
        method = self.get_argument("method")
        try:
            ws_client_id = self.get_argument("ws_client_id")
        except:
            # TODO: add logging here
            ws_client_id = None
        ws_message = WsMessage(ws_client_id)
        client = None
        if method not in ["auth.register", "auth.exchange_keys"]:  # Check signature
            try:
                client = Client.get(id=self.get_argument("client_id"))
                correct_sig_src = "{client_id}|{method}|{data}|{random}|{secret}".format(
                    client_id=self.get_argument("client_id"),
                    method=method,
                    data=self.get_argument("data"),
                    random=self.get_argument("random"),
                    secret=client.secret,
                )
                correct_sig = hashlib.md5(correct_sig_src.encode()).hexdigest()
                if correct_sig != self.get_argument("signature"):
                    raise ValueError
            except:
                self.write(json.dumps({
                    "success": False,
                    "code": "errors.auth.invalid_signature",
                }, ensure_ascii=False))
        request = ApiRequest(
            body=data,
            client=client,
            method=method,
            remote_ip=self.request.remote_ip,
            ws_message=ws_message,
        )
        result = Api.call(request)
        response = json.dumps(result, ensure_ascii=False)
        if not ws_message.empty():
            with Database.instance().db.transaction():
                ws_message.send()
        self.write(response)

    def get(self):
        self.post()
