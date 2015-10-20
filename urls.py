from sockjs.tornado import SockJSRouter

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    CompetitionReportHandler,
    CompetitionsHandler,
    DisciplineResultsHandler,
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
    (r"/c$", CompetitionsHandler),
    (r"/ic/(\d+)/results", DisciplineResultsHandler),
    (r"/participants/(\d+)$", ManageParticipantsHandler),
    (r"/presenter$", PresenterHandler),
    (r"/report/(\d+)$", CompetitionReportHandler),
    (r"/start_list/(\d+)$", StartListHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),

    (r"/api", ApiHandler),
] + ws_router.urls
