import json
import peewee

from playhouse import postgres_ext

from exceptions import ApiError
from models.base_model import BaseModel
from models.proxies import competition_proxy


def serialize_competition_info(raw_data):
    return json.dumps([
        [str(row[0]), str(row[1])]
        for row in raw_data
    ], check_circular=False)


class Competition(BaseModel):
    class Meta:
        order_by = ["-active", "date"]

    name = peewee.CharField()
    date = peewee.CharField()
    info = postgres_ext.BinaryJSONField(default=[], dumps=serialize_competition_info)
    active = peewee.BooleanField(default=True)

    RW_PROPS = ["name", "date", "active", "info"]

    PF_CHILDREN = {
        "disciplines": None,
        "judges": None,
        "clubs": None,
        "participants": None
    }

    def full_prefetch(self):
        self.prefetch({
            "disciplines": {
                "raw_tours": {},
            },
            "judges": {},
        })

    def load(self, data, ws_message):
        from models import (
            Club,
            Discipline,
            Judge,
        )
        if "clubs" in data:
            Club.load_models(self, data["clubs"])
        if "judges" in data:
            Judge.load_models(self, data["judges"])
        if "disciplines" in data:
            Discipline.load_models(self, data["disciplines"])
        ws_message.add_message("reload_data")

    @classmethod
    def create_model(cls, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data)
        cls.create(**create_kwargs)
        ws_message.add_message("competition_list_update")

    def update_model(self, new_data, ws_message):
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=Competition,
            model_id=self.id,
            schema={}
        )
        ws_message.add_message("competition_list_update")

    def delete_model(self, ws_message):
        if self.disciplines.count() > 0:
            raise ApiError("errors.competition.delete_non_empty")
        if self.clubs.count() > 0:
            raise ApiError("errors.competition.delete_non_empty")
        if self.judges.count() > 0:
            raise ApiError("errors.competition.delete_non_empty")
        self.delete_instance()
        ws_message.add_message("competition_list_update");

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_lower_child(result, "disciplines", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(result, "clubs", children)
        result = self.serialize_lower_child(result, "participants", children)
        return result


competition_proxy.initialize(Competition)
