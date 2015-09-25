from Simple.handlers import (
    ApiHandler,
    RoundControlHandler,
    RoundFinalizeHandler,
    RoundInitHandler,
    StatusHandler,
    TabletHandler,
)
from Simple.websocket import WebSocketHandler

handlers = [
    (r"/status$", StatusHandler),
    (r"/round/(\d+)$", RoundControlHandler),
    (r"/round/(\d+)/init$", RoundInitHandler),
    (r"/round/(\d+)/finalize$", RoundFinalizeHandler),
    (r"/tablet/(\d+)$", TabletHandler),
    (r"/api", ApiHandler),
    (r"/ws", WebSocketHandler),
]
