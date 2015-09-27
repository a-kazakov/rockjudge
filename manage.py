#!/usr/bin/env python3

import importlib
import inspect
import time
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

from Simple.websocket import WebSocketClients

@tornado.gen.engine
def post_start():
    print("Started successfully, waiting 5 seconds")
    yield tornado.gen.Task(tornado.ioloop.IOLoop.instance().add_timeout, time.time() + 5)
    print("Reloading all clients...", end=" ")
    WebSocketClients.broadcast("force_refresh", {})
    print("DONE")


class Commands:
    @staticmethod
    def start():
        AsyncIOMainLoop().install()
        app = Application.instance()
        app.listen(settings.LISTEN_PORT)
        post_start()
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
        suite = loader.discover("scoring_systems/rosfarr_no_acro")
        unittest.TextTestRunner().run(suite)

getattr(Commands, argv[1])(*argv[2:])
