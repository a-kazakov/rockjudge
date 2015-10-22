import peewee

from models.base_model import BaseModel
from models.club import Club
from models.proxies import discipline_proxy

from webserver.websocket import WsMessage


class Participant(BaseModel):
    class Meta:
        indexes = (
            (("discipline", "external_id"), True),
        )
        order_by = ["number"]

    discipline = peewee.ForeignKeyField(discipline_proxy, null=True, related_name="participants")
    formation_name = peewee.CharField(default="")
    coaches = peewee.CharField()
    number = peewee.IntegerField(default=0)
    club = peewee.ForeignKeyField(Club, related_name="participants")
    external_id = peewee.CharField(null=True, default=None)

    RW_PROPS = ["formation_name", "coaches", "number", "external_id"]

    def get_name(self):
        if self.is_couple():
            sportsmen = sorted(
                self.sportsmen,
                key=lambda s: (s.gender, s.last_name))
            return " – ".join([s.full_name for s in sportsmen])
        if self.is_solo():
            return self.sportsmen[0].full_name
        return self.formation_name

    def num_sportsmen(self):
        if type(self.sportsmen) == list:
            return len(self.sportsmen)
        result = self.sportsmen.count()
        return result

    def is_couple(self):
        return self.num_sportsmen() == 2

    def is_solo(self):
        return self.num_sportsmen() == 1

    @classmethod
    def _load_one(cls, discipline, club, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.discipline == discipline and cls.external_id == obj["external_id"])
                update_data = cls.gen_model_kwargs(obj, club=club)
                model.update_model(update_data, ws_message=WsMessage())
                return model, False
            except cls.DoesNotExist:
                pass
        create_kwargs = cls.gen_model_kwargs(obj, discipline=discipline, club=club)
        return cls.create(**create_kwargs), True

    @classmethod
    def load_models(cls, discipline, objects):
        from models import (
            Acrobatic,
            Sportsman,
        )
        for obj in objects:
            club = Club.get(Club.external_id == obj["club"])
            model, created = cls._load_one(discipline, club, obj)
            Sportsman.delete().where(Sportsman.participant == model).execute()
            Acrobatic.delete().where(Acrobatic.participant == model).execute()
            Sportsman.load_models(
                participant=model,
                objects=obj["sportsmen"],
            )
            Acrobatic.load_models(model, obj["acrobatics"])

    @classmethod
    def create_model(cls, discipline, data, ws_message):
        from models import (
            Acrobatic,
            Sportsman,
        )
        club = Club.get((Club.id == data["club_id"]) & (Club.competition == discipline.competition_id))
        create_kwargs = cls.gen_model_kwargs(data, discipline=discipline, club=club)
        model = cls.create(**create_kwargs)
        for idx, acro in enumerate(data["acrobatics"]):
            acro_kwargs = {
                key: acro[key]
                for key in ["description", "score"]
            }
            acro_kwargs["number"] = idx
            acro_kwargs["participant"] = model
            Acrobatic.create(**acro_kwargs)
        for sp in data["sportsmen"]:
            sp_kwargs = {
                key: sp[key]
                for key in ["last_name", "first_name", "year_of_birth", "gender"]
            }
            sp_kwargs["participant"] = model
            Sportsman.create(**sp_kwargs)
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
                "sportsmen": {},
                "acrobatics": {},
            }
        )

    def update_model(self, new_data, ws_message):
        from models import (
            Acrobatic,
            Sportsman,
        )
        number_changed = "number" in new_data and new_data["number"] != self.number
        for key in ["number", "external_id", "formation_name", "coaches"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        if "club_id" in new_data:
            club = Club.get((Club.id == new_data["club_id"]) & (Club.competition == self.discipline.competition_id))
            self.club = club
        if "acrobatics" in new_data:
            current_acro = list(self.acrobatics)
            new_acro = new_data["acrobatics"]
            for idx, (current_item, new_item) in enumerate(zip(current_acro, new_acro)):
                current_item.description = new_item["description"]
                current_item.score = new_item["score"]
                current_item.number = idx
                current_item.save()
            if len(new_acro) > len(current_acro):
                for idx in range(len(current_acro), len(new_acro)):
                    Acrobatic.create(
                        participant=self,
                        description=new_acro[idx]["description"],
                        score=new_acro[idx]["score"],
                        number=idx,
                    )
            elif len(new_acro) < len(current_acro):
                for acro in current_acro[len(new_acro):]:
                    acro.delete_instance()
        if "sportsmen" in new_data:
            current_sp = list(self.sportsmen)
            new_sp = new_data["sportsmen"]
            for current_item, new_item in zip(current_sp, new_sp):
                current_item.last_name = new_item["last_name"]
                current_item.first_name = new_item["first_name"]
                current_item.year_of_birth = new_item["year_of_birth"]
                current_item.gender = new_item["gender"]
                current_item.save()
            if len(new_sp) > len(current_sp):
                for new_item in new_sp[len(current_sp):]:
                    Sportsman.create(
                        participant=self,
                        last_name=new_item["last_name"],
                        first_name=new_item["first_name"],
                        year_of_birth=new_item["year_of_birth"],
                        gender=new_item["gender"],
                    )
            elif len(new_sp) < len(current_sp):
                for sp in current_sp[len(new_sp):]:
                    sp.delete_instance()
        self.save()
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
                "sportsmen": {},
                "acrobatics": {},
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
        if "acrobatics" in children:
            result["acrobatics"] = [
                acro.serialize(children["acrobatics"]) for acro in self.acrobatics
            ]
        result = self.serialize_upper_child(result, "club", children)
        result = self.serialize_lower_child(result, "sportsmen", children)
        return result
