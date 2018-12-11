import os.path

from tornado.web import StaticFileHandler

from webserver.handlers import (
    AdminHandler,
    AutoPrinterHandler,
    CompetitionsHandler,
    JudgeHandler,
    PresenterHandler,
    ScreenHandler,
    ScreenOperatorHandler,
    StartPageHandler,
    StaticFileHandlerNoCache,
)
from webserver.websocket import WebSocketHandler


BASE_PATH = os.path.dirname(__file__)
STATIC_PATH = os.path.join(BASE_PATH, "static")
SCREEN_STATIC_PATH = os.path.join(BASE_PATH, "screen", "static")

handlers = [
    (r"/$", StartPageHandler),
    (r"/admin/(\d+)$", AdminHandler),
    (r"/c$", CompetitionsHandler),
    # (r"/conn$", ConnectionTesterHandler),
    (r"/media/screen/(.*)", StaticFileHandlerNoCache, {"path": SCREEN_STATIC_PATH}),
    (r"/presenter/(\d+)$", PresenterHandler),
    (r"/printer/(\d+)$", AutoPrinterHandler),
    (r"/screen/(\d+)", ScreenHandler),
    (r"/screen_operator/(\d+)", ScreenOperatorHandler),
    (r"/static/(.*)", StaticFileHandlerNoCache, {"path": STATIC_PATH}),
    (r"/judge/(\d+)$", JudgeHandler),
    (r"/ws", WebSocketHandler),
]
