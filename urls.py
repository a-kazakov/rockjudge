import os.path

from sockjs.tornado import SockJSRouter
from tornado.web import StaticFileHandler

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    AutoPrinterHandler,
    CompetitionReportHandler,
    CompetitionsHandler,
    ConnectionTesterHandler,
    DisciplineResultsHandler,
    ManageParticipantsHandler,
    PresenterHandler,
    ScreenHandler,
    ScreenOperatorHandler,
    StartListHandler,
    StartPageHandler,
    StaticFileHandlerNoCache,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from webserver.websocket import WebSocketClients


STATIC_PATH = os.path.join(os.path.dirname(__file__), 'static')
SCREEN_STATIC_PATH = os.path.join(os.path.join(os.path.dirname(__file__), 'screen'), 'static')

ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/$", StartPageHandler),
    (r"/admin/(\d+)$", AdminHandler),
    (r"/c$", CompetitionsHandler),
    (r"/conn$", ConnectionTesterHandler),
    (r"/ic/(\d+)/results", DisciplineResultsHandler),
    (r"/media/screen/(.*)", StaticFileHandler, {"path": SCREEN_STATIC_PATH}),
    (r"/participants/(\d+)$", ManageParticipantsHandler),
    (r"/presenter/(\d+)$", PresenterHandler),
    (r"/printer/(\d+)$", AutoPrinterHandler),
    (r"/report/(\d+)$", CompetitionReportHandler),
    (r"/start_list/(\d+)$", StartListHandler),
    (r"/screen/(\d+)", ScreenHandler),
    (r"/screen_operator/(\d+)", ScreenOperatorHandler),
    (r"/static/(.*)", StaticFileHandlerNoCache, {"path": STATIC_PATH}),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
