from Simple.handlers import (
    ApiHandler,
    TourAdminHandler,
    TourResultsHandler,
    StatusHandler,
    TabletHandler,
)
from Simple.websocket import WebSocketHandler

handlers = [
    (r"/status$", StatusHandler),
    (r"/tour/(\d+)$", TourAdminHandler),
    (r"/tour/(\d+)/results$", TourResultsHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
    (r"/ws", WebSocketHandler),
]
