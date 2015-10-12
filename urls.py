from sockjs.tornado import SockJSRouter

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    ManageParticipantsHandler,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from webserver.websocket import WebSocketClients


ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/admin/(\d+)$", AdminHandler),
    (r"/participants/(\d+)$", ManageParticipantsHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
