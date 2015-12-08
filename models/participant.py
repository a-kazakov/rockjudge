import json
import peewee

from playhouse import postgres_ext

from models.base_model import BaseModel
from models.club import Club
from models.proxies import discipline_proxy


def serialize_participant_sportsmen(raw_data):
    return json.dumps([
        {
            "first_name": str(sp["first_name"]),
            "last_name": str(sp["last_name"]),
            "year_of_birth": int(sp["year_of_birth"]),
            "gender": "M" if sp["gender"] == "M" else "F"
        } for sp in raw_data
    ], check_circular=False)


class Participant(BaseModel):
    class Meta:
        indexes = (
            (("discipline", "external_id"), True),
        )
        order_by = ["number", "formation_name", "external_id"]

    discipline = peewee.ForeignKeyField(discipline_proxy, null=True, related_name="participants")
    formation_name = peewee.CharField(default="")
    coaches = peewee.CharField()
    number = peewee.IntegerField(default=0)
    club = peewee.ForeignKeyField(Club, related_name="participants")
    external_id = peewee.CharField(null=True, default=None)
    sportsmen = postgres_ext.BinaryJSONField(default=[], dumps=serialize_participant_sportsmen)

    RW_PROPS = ["formation_name", "coaches", "number", "external_id", "sportsmen"]

    PF_CHILDREN = {
        "club": None,
        "programs": None,
    }

    def get_name(self):
        if self.is_couple():
            sportsmen = sorted(
                self.sportsmen,
                key=lambda s: (s["gender"], s["last_name"]))
            return " – ".join(["{last_name} {first_name}".format(**s) for s in sportsmen])
        if self.is_solo():
            return "{last_name} {first_name}".format(**self.sportsmen[0])
        return self.formation_name

    def is_couple(self):
        return len(self.sportsmen) == 2

    def is_solo(self):
        return len(self.sportsmen) == 1

    def get_default_program(self, program_key):
        for program in self.programs:
            if program.default_for is not None and program_key in program.default_for.split(","):
                return program
        return None

    @classmethod
    def load_models(cls, discipline, objects):
        from models import Program
        if len(objects) == 0:
            return
        clubs_ids = [obj["club"] for obj in objects]
        clubs = {
            club.external_id: club
            for club in Club.select().where(
                (Club.external_id << clubs_ids) &
                (Club.competition == discipline.competition_id)
            )
        }
        prepared = [
            cls.gen_model_kwargs(
                obj,
                discipline=discipline,
                club=clubs[obj["club"]]
            ) for obj in objects
        ]
        for model, created, raw_data in cls.load_models_base(objects, prepared=prepared, discipline=discipline):
            Program.load_models(model, raw_data["programs"])

    @classmethod
    def create_model(cls, discipline, data, ws_message):
        club = Club.get((Club.id == data["club_id"]) & (Club.competition == discipline.competition_id))
        create_kwargs = cls.gen_model_kwargs(
            data,
            discipline=discipline,
            club=club)
        model = cls.create(**create_kwargs)
        ws_message.add_model_update(
            model_type=discipline_proxy,
            model_id=discipline.id,
            schema={
                "participants": {}
            }
        )
        ws_message.add_model_update(
            model_type=cls,
            model_id=model.id,
            schema={
                "club": {},
                "programs": {},
            }
        )

    def update_model(self, new_data, ws_message):
        number_changed = "number" in new_data and new_data["number"] != self.number
        if "club_id" in new_data:
            club = Club.get((Club.id == new_data["club_id"]) & (Club.competition == self.discipline.competition_id))
            self.club = club
        self.update_model_base(new_data)
        if number_changed:
            ws_message.add_model_update(
                model_type=discipline_proxy,
                model_id=self.discipline_id,
                schema={
                    "participants": {}
                }
            )
            ws_message.add_model_update(
                model_type=Club,
                model_id=self.club_id,
                schema={
                    "participants": {}
                }
            )
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "club": {},
                "programs": {},
            }
        )

    def delete_model(self, ws_message):
        discipline_id = self.discipline_id
        self.discipline = None
        self.save()
        ws_message.add_model_update(
            model_type=discipline_proxy,
            model_id=discipline_id,
            schema={
                "participants": {}
            }
        )

    def serialize(self, children={}):
        result = self.serialize_props()
        result["name"] = self.get_name()
        result = self.serialize_upper_child(result, "club", children)
        result = self.serialize_lower_child(result, "programs", children)
        return result
