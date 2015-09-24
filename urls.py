from Simple.handlers import (
    ApiHandler,
    RoundControlHandler,
    RoundFinalizeHandler,
    RoundInitHandler,
    StatusHandler,
)

handlers = [
    (r"/status$", StatusHandler),
    (r"/round/(\d+)$", RoundControlHandler),
    (r"/round/(\d+)/init$", RoundInitHandler),
    (r"/round/(\d+)/finalize$", RoundFinalizeHandler),
    (r"/api", ApiHandler),
]
