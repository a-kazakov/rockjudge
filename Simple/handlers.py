import tornado.web

from .models import Competition

class StatusHandler(tornado.web.RequestHandler):
    def get(self):
        competitions = Competition.select()
        self.render("Simple/status.html", competitions=competitions)
