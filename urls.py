import os.path

from sockjs.tornado import SockJSRouter

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    CompetitionReportHandler,
    CompetitionsHandler,
    ConnectionTesterHandler,
    DisciplineResultsHandler,
    ManageParticipantsHandler,
    PresenterHandler,
    StartListHandler,
    StartPageHandler,
    StaticFilesHandlerNoCache,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from webserver.websocket import WebSocketClients


STATIC_PATH = os.path.join(os.path.dirname(__file__), 'static')

ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/$", StartPageHandler),
    (r"/admin/(\d+)$", AdminHandler),
    (r"/c$", CompetitionsHandler),
    (r"/conn$", ConnectionTesterHandler),
    (r"/ic/(\d+)/results", DisciplineResultsHandler),
    (r"/participants/(\d+)$", ManageParticipantsHandler),
    (r"/presenter$", PresenterHandler),
    (r"/report/(\d+)$", CompetitionReportHandler),
    (r"/start_list/(\d+)$", StartListHandler),
    (r"/static/(.*)", StaticFilesHandlerNoCache, {"path": STATIC_PATH}),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
