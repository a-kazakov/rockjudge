from Simple.handlers import (
    RoundResultsHandler,
    StatusHandler
)

handlers = [
    (r"/status", StatusHandler),
    (r"/round/(\d+)/result", RoundResultsHandler),
]
