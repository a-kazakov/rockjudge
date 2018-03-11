import json
import peewee

from playhouse import postgres_ext

from exceptions import ApiError
from protection import import_file_protector
from models.base_model import BaseModel
from models.proxies import competition_proxy

import settings


def serialize_competition_info(raw_data):
    return json.dumps([
        [str(row[0]), str(row[1])]
        for row in raw_data
    ], check_circular=False)


class Competition(BaseModel):
    class Meta:
        order_by = ["-active", "name"]

    name = peewee.CharField()
    date = peewee.CharField()
    info = postgres_ext.BinaryJSONField(default=[], dumps=serialize_competition_info)
    active = peewee.BooleanField(default=True)
    screen_data = postgres_ext.BinaryJSONField(default={})
    rules_set = peewee.CharField()
    deleted = peewee.BooleanField(default=False)

    RW_PROPS = ["name", "date", "active", "info", "screen_data", "deleted"]
    RO_PROPS = ["rules_set"]

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

    def load(self, encoded_data, items, ws_message):
        from models import (
            Club,
            CompetitionPlanItem,
            Discipline,
            Judge,
        )
        print(">>> Decode 1")
        data = import_file_protector.decode(encoded_data)
        print(">>> Decode 2")
        if data is None:
            raise ApiError("errors.admin.load_syntax_error")
        print(">>> Decode 3")
        if "clubs" in data and items["clubs"]:
            Club.load_models(self, data["clubs"])
        if "judges" in data and items["judges"]:
            Judge.load_models(self, data["judges"])
        if "disciplines" in data and items["disciplines"]:
            Discipline.load_models(self, data["disciplines"], items)
        if "plan" in data and items["plan"]:
            CompetitionPlanItem.load_models(self, data["plan"])
        ws_message.add_message("reload_data")

    @classmethod
    def create_model(cls, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data, rules_set=data["rules_set"])
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

    def get_active_tours(self):
        from models import (
            Discipline,
            Tour,
        )
        return list(Tour.select().join(Discipline).where(
            (Tour.active == True) &  # NOQA
            (Discipline.competition == self)
        ))

    def delete_model(self, ws_message):
        self.deleted = True
        self.active = False
        self.save()
        ws_message.add_message("competition_list_update")

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_lower_child(result, "disciplines", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(result, "clubs", children)
        result = self.serialize_lower_child(result, "plan", children)
        result = self.serialize_lower_child(result, "clients", children)
        return result

    def export(self):
        SCHEMA = {
            "disciplines": {
                "tours": {
                    "runs": {
                        "scores": {},
                    }
                },
                "discipline_judges": {},
                "participants": {
                    "programs": {},
                },
            },
            "judges": {},
            "clubs": {},
            "plan": {}
        }
        self.smart_prefetch(SCHEMA)
        result = self.serialize_props()
        result.update({
            "version": settings.VERSION,
            "disciplines": [
                discipline.export()
                for discipline in self.disciplines
            ],
            "judges": [
                judge.export()
                for judge in self.judges
            ],
            "clubs": [
                club.export()
                for club in self.clubs
            ],
            "plan": [
                item.export()
                for item in self.plan
            ]
        })
        return result


competition_proxy.initialize(Competition)
