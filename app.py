import os.path

import tornado.web

import settings
import urls


class Application(tornado.web.Application):
    _instance = None

    def __init__(self):
        config = dict(
            cookie_secret=settings.COOKIE_SECRET,
            template_path=os.path.join(os.path.dirname(__file__), 'templates'),
            login_url='/',
            xsrf_cookies=False,
            debug=settings.DEBUG,
            compress_response=True,
            websocket_ping_interval=60,
        )
        super().__init__(urls.handlers, **config)

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
