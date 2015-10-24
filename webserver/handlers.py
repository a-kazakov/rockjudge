import json
import logging
import time
import traceback

import tornado.gen
import tornado.web

from api import Api
from db import Database
from exceptions import ApiError
from models import (
    Competition,
    Judge,
    Tour,
)
from log import log_api
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


class CompetitionsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("competitions.html")


class DisciplineResultsHandler(tornado.web.RequestHandler):
    def get(self, discipline_id):
        self.render(
            "discipline_results.html",
            discipline_id=discipline_id,
        )


class ManageParticipantsHandler(tornado.web.RequestHandler):
    def get(self, discipline_id):
        self.render(
            "manage_participants.html",
            discipline_id=discipline_id,
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
        competition_ids = [c.id for c in Competition.select().where(Competition.active == True)]  # NOQA
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


class LoggingCounterHandler(logging.StreamHandler):
    def __init__(self):
        super().__init__()
        self.cnt = 0

    def emit(self, record):
        import re
        record = record.msg[0]
        record = re.sub(r'SELECT.+?FROM', 'SELECT * FROM', record)
        record = re.sub(r'(%s, )+%s', '...', record)
        # print(record)
        self.cnt += 1


class ApiHandler(tornado.web.RequestHandler):
    def post(self):
        ex_str = None
        hdlr = LoggingCounterHandler()
        logger = logging.getLogger('peewee')
        logger.setLevel(logging.DEBUG)
        logger.addHandler(hdlr)
        try:
            begin = time.time()
            data = None
            response = None
            data = json.loads(self.get_argument("data"))
            method = self.get_argument("method")
            try:
                client_id = self.get_argument("client_id")
            except:
                # TODO: add logging here
                client_id = None
            ws_message = WsMessage(client_id)
            with Database.instance().db.transaction():
                result = Api.call(method, data, ws_message=ws_message)
                response = json.dumps(result)
            if not ws_message.empty():
                with Database.instance().db.transaction():
                    ws_message.send()
            self.write(response)
        except ApiError as ex:
            ex_str = traceback.format_exc()
            response = json.dumps({
                "success": False,
                "code": ex.code,
                "args": ex.args,
            })
            self.write(response)
        except Exception as ex:
            ex_str = traceback.format_exc()
            response = json.dumps({
                "success": False,
                "code": "errors.global.internal_server_error",
                "args": [],
            })
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
            logger.removeHandler(hdlr)
            print("Api call: {} ({:.3f}s), {} queries".format(method, total_time, hdlr.cnt))

    def get(self):
        self.post()
