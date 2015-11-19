import asyncio
import peewee_asyncext

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
