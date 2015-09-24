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
        self.redirect("/round/{}".format(round_id))


class RoundFinalizeHandler(tornado.web.RequestHandler):
    def get(self, round_id):
        round = Round.select().where(Round.id == int(round_id)).get()
        round.finalize()
        self.redirect("/round/{}".format(round_id))


class ApiHandler(tornado.web.RequestHandler):
    def api_set_judge_score(self):
        run_id = self.get_argument("run")
        judge_id = self.get_argument("judge")
        score = self.get_argument("score")
        run = ParticipantRun.select().where(ParticipantRun.id == run_id).get()
        judge = Judge.select().where(Judge.id == judge_id).get()
        run.set_judge_score(judge, score)

    def post(self):
        method = self.get_argument("method", "")
        getattr(self, "api_{}".format(method))()

    def get(self):
        self.post()
