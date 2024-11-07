import os
from functools import cache
from pathlib import Path

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


@cache
def get_client_files_path() -> Path:
    env_value = os.environ.get("RJ_BASE_PATH")
    if env_value is not None:
        return Path(env_value)
    path_value = Path(__file__).parent
    if path_value.name == "_internal":
        path_value = path_value.parent
    return path_value


STATIC_PATH = str(get_client_files_path() / "static")
SCREEN_STATIC_PATH = str(get_client_files_path() / "screen")

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
