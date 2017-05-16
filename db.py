import asyncio
import peewee_asyncext
import logging
import time

from settings import DB_CONFIG


class Database:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._db = peewee_asyncext.PooledPostgresqlExtDatabase(
            self._db_name,
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"],
            host=DB_CONFIG["host"],
        )
        asyncio.get_event_loop().run_until_complete(self.db.connect_async())

    @property
    def _db_name(self):
        return DB_CONFIG["dbname"]

    @property
    def db(self):
        return self._db


class SqlLoggingHandler(logging.StreamHandler):
    def __init__(self):
        super().__init__()
        self.cnt = 0

    def emit(self, record):
        # import re
        # import traceback
        # record = record.msg[0]
        # record = re.sub(r'SELECT.+?FROM', 'SELECT * FROM', record)
        # record = re.sub(r'(%s, )+%s', '...', record)
        # print(record)
        # print(traceback.print_stack())
        self.cnt += 1


class StatsCounter:
    def __enter__(self):
        self.start_time = time.time()
        self.loghdlr = SqlLoggingHandler()
        self.logger = logging.getLogger('peewee')
        self.logger.setLevel(logging.DEBUG)
        self.logger.addHandler(self.loghdlr)
        return self

    def __exit__(self, exception_type, exception_value, traceback):
        self.logger.removeHandler(self.loghdlr)

    @property
    def time(self):
        return int(round(1000 * (time.time() - self.start_time)))

    @property
    def queries(self):
        return self.loghdlr.cnt
