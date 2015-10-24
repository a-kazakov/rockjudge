import json
import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.proxies import competition_proxy


class Competition(BaseModel):
    class Meta:
        order_by = ["-active", "date"]

    name = peewee.CharField()
    date = peewee.CharField()
    info = peewee.TextField(default="[]")
    active = peewee.BooleanField(default=True)

    RW_PROPS = ["name", "date", "active"]

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

    def get_max_number(self):
        from models import (
            Discipline,
            Participant,
        )
        result = (Participant.select(Discipline, Participant)
                  .join(Discipline)
                  .where(Discipline.competition == self)
                  .order_by(Participant.number.desc())
                  .limit(1))
        result = list(result)
        if result == []:
            return 0
        return result[0].number

    def load(self, data, ws_message):
        from models import (
            Club,
            Discipline,
            Judge,
        )
        if "clubs" in data:
            Club.load_models(self, data["clubs"])
        if "disciplines" in data:
            Discipline.load_models(self, data["disciplines"])
        if "judges" in data:
            Judge.load_models(self, data["judges"])
        ws_message.add_message("reload_data")

    @classmethod
    def create_model(cls, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data, info=json.dumps(data["info"]))
        cls.create(**create_kwargs)
        ws_message.add_message("competition_list_update")

    def update_model(self, new_data, ws_message):
        super().update_model(new_data, info=json.dumps(new_data["info"]))
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

    def serialize(self, children={}):
        result = self.serialize_props()
        result["info"] = json.loads(self.info)
        result = self.serialize_lower_child(result, "disciplines", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(result, "clubs", children)
        result = self.serialize_lower_child(result, "participants", children)
        return result


competition_proxy.initialize(Competition)
