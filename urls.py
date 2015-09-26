from Simple.handlers import (
    ApiHandler,
    TourControlHandler,
    TourFinalizeHandler,
    TourInitHandler,
    StatusHandler,
    TabletHandler,
)
from Simple.websocket import WebSocketHandler

handlers = [
    (r"/status$", StatusHandler),
    (r"/tour/(\d+)$", TourControlHandler),
    (r"/tour/(\d+)/init$", TourInitHandler),
    (r"/tour/(\d+)/finalize$", TourFinalizeHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
    (r"/ws", WebSocketHandler),
]
