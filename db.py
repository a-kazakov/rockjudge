import asyncio
import peewee_async

from settings import DB_CONFIG


class Database:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._db = peewee_async.PostgresqlDatabase(
            self._db_name,
            user=DB_CONFIG["user"],
            password=DB_CONFIG["password"],
            host=DB_CONFIG["host"],
        )

    @property
    def _db_name(self):
        return DB_CONFIG["dbname"]

    @property
    def db(self):
        return self._db


asyncio.get_event_loop().run_until_complete(Database.instance().db.connect_async())
