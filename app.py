import inspect
import os.path

import peewee
import tornado.web

from collections import deque

import settings
import urls

from db import Database


class Application(tornado.web.Application):
    _instance = None

    def __init__(self, ioloop=None):
        config = dict(
            cookie_secret=settings.COOKIE_SECRET,
            template_path=os.path.join(os.path.dirname(__file__), 'templates'),
            login_url='/',
            xsrf_cookies=False,
            debug=settings.DEBUG,
        )
        super().__init__(urls.handlers, **config)

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance


class ModelManager:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @property
    def all_models(self):
        import models
        result = [
            pair[1]
            for pair in inspect.getmembers(models, predicate=inspect.isclass)
            if issubclass(pair[1], peewee.Model)
        ]
        yield from result

    def create_models(self):
        q = deque(self.all_models)
        to_kill = len(q)
        latest_ex = None
        while len(q) > 0:
            model = q.popleft()
            try:
                model.create_table(True)
                to_kill = len(q)
            except Exception as ex:
                latest_ex = ex
                q.append(model)
            if to_kill == 0 and len(q) > 0:
                raise latest_ex
            to_kill -= 1

    def reset(self):
        Database.instance().db.drop_tables(list(self.all_models), safe=True, cascade=True)
        self.create_models()
