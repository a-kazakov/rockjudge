from sockjs.tornado import SockJSRouter

from Simple.handlers import (
    ApiHandler,
    AdminHandler,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from Simple.websocket import WebSocketClients


ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/admin/(\d+)$", AdminHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
