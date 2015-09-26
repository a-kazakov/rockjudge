import json
import tornado.web

from .models import (
    Competition,
    Judge,
    ParticipantRun,
    Tour,
)
from .serializers import (
    make_tour_data,
    make_tour_results,
)
from .utils import get_tablet_state
from .websocket import WebSocketClients


clients = set()

class StatusHandler(tornado.web.RequestHandler):
    def get(self):
        competitions = Competition.select()
        self.render("Simple/status.html", competitions=competitions)


class TourControlHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == int(tour_id)).get()
        if tour.finalized:
            self.render(
                "Simple/tour_results.html",
                tour=tour,
                results=make_tour_results(tour),
            )
        else:
            return self.render(
                "Simple/tour.html",
                tour=tour,
                data=make_tour_data(tour)
            )


class TourInitHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == int(tour_id)).get()
        tour.init()
        WebSocketClients.broadcast({
            "type": "tour_update",
            "data": {
                "tour_id": tour.id,
            }
        })
        self.redirect("/tour/{}".format(tour_id))


class TourFinalizeHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == int(tour_id)).get()
        tour.finalize()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {
                "tour_id": tour.id,
            }
        })
        self.redirect("/tour/{}".format(tour_id))


class TabletHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        judge = Judge.select().where(Judge.id == judge_id).get()
        return self.render(
            "Simple/tablet.html",
            judge=judge,
            state=get_tablet_state(judge),
        )


class ApiHandler(tornado.web.RequestHandler):
    def api_set_judge_score(self):
        from scoring_systems.rosfarr_no_acro import serializers
        run_id = self.data["run"]
        judge_id = self.data["judge"]
        score = self.data["score"]
        run = ParticipantRun.select().where(ParticipantRun.id == run_id).get()
        judge = Judge.select().where(Judge.id == judge_id).get()
        run.set_judge_score(judge, score)
        WebSocketClients.broadcast({
            "type": "score_update",
            "data": {
                "run_id": run_id,
                "judge_id": judge_id,
                "score": serializers.serialize_judge_score(run, judge),
            }
        })
        return {}

    def api_start_tour(self):
        tour_id = self.data["tour"]
        tour = Tour.select().where(Tour.id == int(tour_id)).get()
        tour.start()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {},
        })
        return {
            "current_heat": tour.current_heat,
        }

    def api_next_heat(self):
        tour = Tour.get_active()
        tour.next_heat()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {},
        })
        return {
            "current_heat": tour.current_heat,
        }

    def api_get_tablet_state(self):
        judge_id = self.data["judge"]
        judge = Judge.select().where(Judge.id == judge_id).get()
        return get_tablet_state(judge)

    def post(self):
        raw_data = json.loads(self.get_argument("request"))
        self.data = raw_data["data"]
        self.write(json.dumps(getattr(self, "api_{}".format(raw_data["method"]))()))

    def get(self):
        self.post()
