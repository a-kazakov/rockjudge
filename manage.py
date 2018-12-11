#!/usr/bin/env python3

import asyncio
import json
import unittest
from concurrent.futures.thread import ThreadPoolExecutor
from sys import argv

import tornado.gen
import tornado.ioloop
from tornado.platform.asyncio import AsyncIOMainLoop


# This should happen before any app imports
AsyncIOMainLoop().install()

import settings  # noqa


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
    def reset(password=""):
        from db import db, ModelBase

        if password != "yes-i-am-sure":
            print(
                "Are you sure want to reset everything? Type 'Yes, I'm sure!' to continue."
            )
            if input() == "Yes, I'm sure!":
                print("Resetting ...")
                db.import_all_models()
                ModelBase.metadata.drop_all(bind=db.engine)
                ModelBase.metadata.create_all(bind=db.engine)
                print("Done")
            else:
                print("Wrong password")
        else:
            db.import_all_models()
            ModelBase.metadata.drop_all(bind=db.engine)
            ModelBase.metadata.create_all(bind=db.engine)

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


if __name__ == "__main__":
    getattr(Commands, argv[1])(*argv[2:])
