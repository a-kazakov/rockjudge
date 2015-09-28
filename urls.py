from Simple.handlers import (
    ApiHandler,
    AdminHandler,
    TourAdminHandler,
    TourResultsHandler,
    TabletHandler,
)
from Simple.websocket import WebSocketHandler

handlers = [
    (r"/admin/(\d+)$", AdminHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
    (r"/ws", WebSocketHandler),
]
