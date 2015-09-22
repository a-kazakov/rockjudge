import tornado.web

from .models import (
    Competition,
    Round,
)
from .serializers import make_round_results

class StatusHandler(tornado.web.RequestHandler):
    def get(self):
        competitions = Competition.select()
        self.render("Simple/status.html", competitions=competitions)


class RoundResultsHandler(tornado.web.RequestHandler):
    def get(self, round_id):
        round = Round.select().where(Round.id == round_id).get()
        print(round)
        self.render(
            "Simple/round_results.html",
            round=round,
            results=make_round_results(round),
        )
