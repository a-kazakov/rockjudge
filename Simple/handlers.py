import json
import tornado.web

from .models import (
    Competition,
    Judge,
    ParticipantRun,
    Round,
)
from .serializers import (
    make_round_data,
    make_round_results,
)
from .utils import get_tablet_state
from .websocket import WebSocketClients


clients = set()

class StatusHandler(tornado.web.RequestHandler):
    def get(self):
        competitions = Competition.select()
        self.render("Simple/status.html", competitions=competitions)


class RoundControlHandler(tornado.web.RequestHandler):
    def get(self, round_id):
        round = Round.select().where(Round.id == int(round_id)).get()
        if round.finalized:
            self.render(
                "Simple/round_results.html",
                round=round,
                results=make_round_results(round),
            )
        else:
            return self.render(
                "Simple/round.html",
                round=round,
                data=make_round_data(round)
            )


class RoundInitHandler(tornado.web.RequestHandler):
    def get(self, round_id):
        round = Round.select().where(Round.id == int(round_id)).get()
        round.init()
        WebSocketClients.broadcast({
            "type": "round_update",
            "data": {
                "round_id": round.id,
            }
        })
        self.redirect("/round/{}".format(round_id))


class RoundFinalizeHandler(tornado.web.RequestHandler):
    def get(self, round_id):
        round = Round.select().where(Round.id == int(round_id)).get()
        round.finalize()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {
                "round_id": round.id,
            }
        })
        self.redirect("/round/{}".format(round_id))


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
        run_id = self.get_argument("run")
        judge_id = self.get_argument("judge")
        score = self.get_argument("score")
        run = ParticipantRun.select().where(ParticipantRun.id == run_id).get()
        judge = Judge.select().where(Judge.id == judge_id).get()
        run.set_judge_score(judge, score)
        WebSocketClients.broadcast({
            "type": "score_update",
            "data": {
                "run_id": run_id,
                "judge_id": judge_id,
                "score": score,
            }
        })
        return {}

    def api_start_round(self):
        round_id = self.get_argument("round")
        round = Round.select().where(Round.id == int(round_id)).get()
        round.start()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {},
        })
        return {
            "current_heat": round.current_heat,
        }

    def api_next_heat(self):
        round = Round.get_active()
        round.next_heat()
        WebSocketClients.broadcast({
            "type": "status_update",
            "data": {},
        })
        return {
            "current_heat": round.current_heat,
        }

    def api_get_tablet_state(self):
        judge_id = self.get_argument("judge")
        judge = Judge.select().where(Judge.id == judge_id).get()
        return get_tablet_state(judge)

    def post(self):
        method = self.get_argument("method", "")
        self.write(json.dumps(getattr(self, "api_{}".format(method))()))

    def get(self):
        self.post()
