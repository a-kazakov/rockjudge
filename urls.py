from sockjs.tornado import SockJSRouter

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    CompetitionReportHandler,
    InnerCompetitionResultsHandler,
    ManageParticipantsHandler,
    PresenterHandler,
    StartListHandler,
    StartPageHandler,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from webserver.websocket import WebSocketClients


ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/$", StartPageHandler),
    (r"/admin/(\d+)$", AdminHandler),
    (r"/report/(\d+)$", CompetitionReportHandler),
    (r"/ic/(\d+)/results", InnerCompetitionResultsHandler),
    (r"/participants/(\d+)$", ManageParticipantsHandler),
    (r"/presenter$", PresenterHandler),
    (r"/start_list/(\d+)$", StartListHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
