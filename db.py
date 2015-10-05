import asyncio
import peewee
import peewee_async
import tornado.gen

from settings import DB_CONFIG


class Database:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._db = peewee_async.PooledPostgresqlDatabase(
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


class BaseModel(peewee.Model):
    class Meta:
        database = Database.instance().db

    @tornado.gen.coroutine
    def prefetch(self, schema):
        for child_schema in schema:
            yield self._prefetch_impl([self], child_schema)

    @classmethod
    @tornado.gen.coroutine
    def _prefetch_impl(cls, models, schema):
        if models == []:
            return []
        if schema["ref_dir"] == "up":
            back_ref = getattr(schema["model"], schema["ref"]).related_name
            ids = [model.id for model in models]
            db_response = yield from peewee_async.execute(
                    schema["model"].select().where(getattr(schema["model"], schema["ref"]) << ids))
            children = list(db_response)
            rev_index = {}
            for model in models:
                setattr(model, back_ref, [])
                rev_index[model.id] = model
            for child_schema in schema["children"]:
                children = yield cls._prefetch_impl(children, child_schema)
            for child in children:
                model = rev_index[getattr(child, schema["ref"] + "_id")]
                setattr(child, schema["ref"], model)
                getattr(model, back_ref).append(child)
        else:
            ids = [getattr(model, schema["ref"] + "_id") for model in models]
            db_response = yield from peewee_async.execute(
                    schema["model"].select().where(getattr(schema["model"], "id") << ids))
            children = list(db_response)
            rev_index = {}
            for child in children:
                rev_index[child.id] = child
            for child_schema in schema["children"]:
                children = yield cls._prefetch_impl(children, child_schema)
            for model in models:
                setattr(model, schema["ref"], rev_index[getattr(model, schema["ref"] + "_id")])
        return models
