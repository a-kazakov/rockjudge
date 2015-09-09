#!/usr/bin/env python3

import importlib
import inspect
import unittest

from sys import argv

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
        AsyncIOMainLoop().install()
        app = Application.instance()
        app.listen(settings.LISTEN_PORT)
        tornado.ioloop.IOLoop.instance().start()

    @staticmethod
    def stop():
        tornado.ioloop.IOLoop.instance().stop()

    @staticmethod
    def setup():
        ModelManager.reset("base")

    @staticmethod
    def test():
        AsyncIOMainLoop().install()
        loader = unittest.TestLoader()
        suite = loader.discover("Tournament")
        unittest.TextTestRunner().run(suite)

getattr(Commands, argv[1])(*argv[2:])
