import json
import tornado.web

from .models import (
    Competition,
    CompetitionJudge,
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


class TourAdminHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        tour = Tour.select().where(Tour.id == tour_id).get()
        if tour.finalized:
            self.redirect("/tour/{}/results".format(tour_id))
        else:
            return self.render(
                "Simple/tour_admin.html",
                tour_id=tour_id,
            )

class TourResultsHandler(tornado.web.RequestHandler):
    def get(self, tour_id):
        self.render(
            "Simple/tour_results.html",
            tour_id=tour_id,
        )

class TabletHandler(tornado.web.RequestHandler):
    def get(self, judge_id):
        return self.render(
            "Simple/tablet.html",
            judge_id=judge_id,
        )


class ApiHandler(tornado.web.RequestHandler):
    def api_set_judge_score(self):
        run = ParticipantRun.select().where(ParticipantRun.id == self.data["run_id"]).get()
        judge = CompetitionJudge.select().where(CompetitionJudge.id == self.data["judge_id"]).get()
        run.set_judge_score(judge, self.data["score"])
        return {}

    def api_set_judge_score(self):
        run = ParticipantRun.select().where(ParticipantRun.id == self.data["run_id"]).get()
        judge = CompetitionJudge.select().where(CompetitionJudge.id == self.data["judge_id"]).get()
        run.set_judge_score(judge, self.data["score"]);
        return {}

    def api_get_run(self):
        run = ParticipantRun.select().where(ParticipantRun.id == self.data["run_id"]).get()
        return run.serialize()

    def api_set_run_heat(self):
        run = ParticipantRun.select().where(ParticipantRun.id == self.data["run_id"]).get()
        run.set_heat(self.data["heat"])
        return {}

    def api_get_tour(self):
        tour = Tour.select().where(Tour.id == self.data["tour_id"]).get()
        return tour.serialize()

    def api_init_tour(self):
        tour_id = self.data["tour_id"]
        tour = Tour.select().where(Tour.id == tour_id).get()
        tour.init()
        return {}

    def api_finalize_tour(self):
        tour_id = self.data["tour_id"]
        tour = Tour.select().where(Tour.id == tour_id).get()
        tour.finalize()
        return {}

    def api_start_tour(self):
        tour_id = self.data["tour_id"]
        tour = Tour.select().where(Tour.id == tour_id).get()
        tour.start()
        return {}

    def api_stop_tour(self):
        tour_id = self.data["tour_id"]
        tour = Tour.select().where(Tour.id == tour_id).get()
        tour.stop()
        return {}

    def api_next_heat(self):
        tour = Tour.get_active()
        tour.next_heat()
        return {
            "current_heat": tour.current_heat,
        }

    def api_get_current_heat(self):
        tour = Tour.get_active()
        if tour is None:
            return {
                "tour_id": None,
                "current_heat": None,
            }
        else:
            return {
                "tour_id": tour.id,
                "current_heat": tour.current_heat,
            }

    def api_get_tablet_state(self):
        judge_id = self.data["judge_id"]
        judge = CompetitionJudge.select().where(CompetitionJudge.id == judge_id).get()
        return get_tablet_state(judge)

    def api_get_tour_results(self):
        tour = Tour.select().where(Tour.id == self.data["tour_id"]).get()
        return tour.get_serialized_results()

    def post(self):
        raw_data = json.loads(self.get_argument("request"))
        self.data = raw_data["data"]
        self.write(json.dumps(getattr(self, "api_{}".format(raw_data["method"]))()))

    def get(self):
        self.post()
