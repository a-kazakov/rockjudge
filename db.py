import asyncio
import peewee
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

    def prefetch_child(self, name):
        child = getattr(self, name)
        if type(child) == list:
            return
        setattr(self, name, list(child))

    @classmethod
    def create_prefetching_schema(cls, model_type, schema):
        result = []
        for child_name, nested_schema in schema.items():
            rel_manager = getattr(model_type, child_name)
            rel_model = rel_manager.rel_model
            if isinstance(rel_manager, peewee.ForeignKeyField):
                result.append({
                    "model": rel_model,
                    "ref": child_name,
                    "ref_dir": "down",
                    "children": cls.create_prefetching_schema(rel_model, nested_schema)
                })
            else:
                result.append({
                    "model": rel_model,
                    "ref": rel_manager.field.name,
                    "ref_dir": "up",
                    "children": cls.create_prefetching_schema(rel_model, nested_schema)
                })
        return result

    def prefetch(self, schema):
        new_schema = self.create_prefetching_schema(self.__class__, schema)
        for child_schema in new_schema:
            self._prefetch_impl([self], child_schema)
        return self

    @classmethod
    def _prefetch_impl(cls, models, schema):
        if models == []:
            return []
        if schema["ref_dir"] == "up":
            back_ref = getattr(schema["model"], schema["ref"]).related_name
            ids = [model.id for model in models]
            db_response = schema["model"].select().where(getattr(schema["model"], schema["ref"]) << ids).execute()
            children = list(db_response)
            rev_index = {}
            for model in models:
                setattr(model, back_ref, [])
                rev_index[model.id] = model
            for child_schema in schema["children"]:
                children = cls._prefetch_impl(children, child_schema)
            for child in children:
                model = rev_index[getattr(child, schema["ref"] + "_id")]
                setattr(child, schema["ref"], model)
                getattr(model, back_ref).append(child)
        else:
            ids = [getattr(model, schema["ref"] + "_id") for model in models]
            db_response = schema["model"].select().where(getattr(schema["model"], "id") << ids).execute()
            children = list(db_response)
            rev_index = {}
            for child in children:
                rev_index[child.id] = child
            for child_schema in schema["children"]:
                children = cls._prefetch_impl(children, child_schema)
            for model in models:
                setattr(model, schema["ref"], rev_index[getattr(model, schema["ref"] + "_id")])
        return models

    def get_sorting_key(self): # Default
        return 0

    def get_back_ref(self, field):
        return None

    def serialize_as_child(self, children, serializer=None):
        if serializer is None:
            serializer = lambda x, c: x.serialize(children=c)
        return {
            "model": self.__class__.__name__,
            "id": self.id,
            "data": serializer(self, children)
        }

    def serialize_upper_child(self, current_result, child_name, all_children, serializer=None):
        if child_name in all_children:
            current_result["^" + child_name] = \
                getattr(self, child_name).serialize_as_child(all_children[child_name], serializer)
        return current_result

    def serialize_lower_child(self, current_result, child_name, all_children, serializer=None):
        if child_name in all_children:
            sorted_children = sorted(getattr(self, child_name), key=lambda x: x.get_sorting_key())
            back_ref = self.get_back_ref(child_name)
            if back_ref is None:
                back_ref = getattr(self.__class__, child_name).field.name
            current_result["*" + child_name] = {
                "back_ref": back_ref,
                "children": [
                    child.serialize_as_child(all_children[child_name], serializer)
                    for child in sorted_children
                ]
            }
        return current_result
