#!/usr/bin/env python3

import asyncio
import json
import unittest

from sys import argv

import tornado.gen
import tornado.ioloop

from tornado.platform.asyncio import AsyncIOMainLoop

# This should happen before any app imports
AsyncIOMainLoop().install()

import settings

class Commands:
    @staticmethod
    def start():
        from app import Application
        print("Starting RockJudge server...")
        app = Application.instance()
        app.listen(settings.LISTEN_PORT)
        asyncio.get_event_loop().run_forever()
        # tornado.ioloop.IOLoop.instance().start()

    @staticmethod
    def stop():
        tornado.ioloop.IOLoop.instance().stop()

    @staticmethod
    def install():
        from service import db_setup
        db_setup.setup()

    @staticmethod
    def setup():
        from app import ModelManager
        ModelManager.instance().reset("simple")

    @staticmethod
    def reset():
        from app import ModelManager
        ModelManager.instance().reset()

    @staticmethod
    def test():
        loader = unittest.TestLoader()
        suite = loader.discover(".")
        unittest.TextTestRunner().run(suite)

    @staticmethod
    def dump_log(filename):
        from models import ApiLogItem
        data = ApiLogItem.fetch_all()
        with open(filename, "wt", encoding="utf-8") as f:
            json.dump(data, f, indent=2, sort_keys=True, ensure_ascii=False)
        print("Success.")

    @staticmethod
    def replay(filename):
        from api import Api
        from webserver.websocket import WsMessage
        from app import ModelManager
        ModelManager.instance().reset()
        with open(filename, "rt", encoding="utf-8") as f:
            log = json.load(f)
        for cmd in log:
            Api.call(cmd["method"], cmd["request"], WsMessage())


if __name__ == "__main__":
    getattr(Commands, argv[1])(*argv[2:])
