import os.path

from sockjs.tornado import SockJSRouter
from tornado.web import StaticFileHandler

from webserver.handlers import (
    ApiHandler,
    AdminHandler,
    AutoPrinterHandler,
    CompetitionsHandler,
    ConnectionTesterHandler,
    JudgeHandler,
    PresenterHandler,
    ScreenHandler,
    ScreenOperatorHandler,
    StartPageHandler,
    StaticFileHandlerNoCache,
)
from webserver.websocket import WebSocketClients


STATIC_PATH = os.path.join(os.path.dirname(__file__), 'static')
SCREEN_STATIC_PATH = os.path.join(os.path.join(os.path.dirname(__file__), 'screen'), 'static')

ws_router = SockJSRouter(WebSocketClients, '/ws')

handlers = [
    (r"/$", StartPageHandler),
    (r"/admin/(\d+)$", AdminHandler),
    (r"/c$", CompetitionsHandler),
    (r"/conn$", ConnectionTesterHandler),
    (r"/media/screen/(.*)", StaticFileHandler, {"path": SCREEN_STATIC_PATH}),
    (r"/presenter/(\d+)$", PresenterHandler),
    (r"/printer/(\d+)$", AutoPrinterHandler),
    (r"/screen/(\d+)", ScreenHandler),
    (r"/screen_operator/(\d+)", ScreenOperatorHandler),
    (r"/static/(.*)", StaticFileHandlerNoCache, {"path": STATIC_PATH}),
    (r"/judge/(\d+)$", JudgeHandler),
    (r"/api", ApiHandler),
] + ws_router.urls
