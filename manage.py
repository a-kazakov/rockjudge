#!/usr/bin/env python3

import unittest

from sys import argv

import tornado.gen
import tornado.ioloop

from tornado.platform.asyncio import AsyncIOMainLoop

import settings

from app import (
    Application,
    ModelManager,
)


class Commands:
    @staticmethod
    def start():
        print("Starting RockJudge server...")
        app = Application.instance()
        app.listen(settings.LISTEN_PORT)
        tornado.ioloop.IOLoop.instance().start()

    @staticmethod
    def stop():
        tornado.ioloop.IOLoop.instance().stop()

    @staticmethod
    def setup():
        ModelManager.instance().reset("simple")

    @staticmethod
    def test():
        AsyncIOMainLoop().install()
        loader = unittest.TestLoader()
        suite = loader.discover(".")
        unittest.TextTestRunner().run(suite)

getattr(Commands, argv[1])(*argv[2:])
