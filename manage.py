#!/usr/bin/env python3

import asyncio
import unittest

from sys import argv

import tornado.gen
import tornado.ioloop

from tornado.platform.asyncio import AsyncIOMainLoop

# This should happend before any app imports
AsyncIOMainLoop().install()

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
        asyncio.get_event_loop().run_forever()
        # tornado.ioloop.IOLoop.instance().start()

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


if __name__ == "__main__":
    getattr(Commands, argv[1])(*argv[2:])
