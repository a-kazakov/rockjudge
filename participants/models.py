import peewee

from db import BaseModel


competition_proxy = peewee.Proxy()
inner_competition_proxy = peewee.Proxy()

class Club(BaseModel):
    indexes = (
        (("competition", "external_id"), False),
    )
    competition = peewee.ForeignKeyField(competition_proxy)
    name = peewee.CharField()
    city = peewee.CharField()
    external_id = peewee.CharField(null=True, default=None)

    def serialize(self, children={}):
        return {
            "name": self.name,
            "city": self.city,
        }

    @classmethod
    def _load_one(cls, competition, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["name", "city"]:
                    setattr(model, key, obj[key])
                model.save()
                return
            except cls.DoesNotExist:
                pass
        cls.create(competition=competition, **obj)

    @classmethod
    def load(cls, competition, objects):
        for obj in objects:
            cls._load_one(competition, obj)


class Participant(BaseModel):
    class Meta:
        indexes = (
            (("inner_competition", "external_id"), False),
        )
        order_by = ["number"]

    inner_competition = peewee.ForeignKeyField(inner_competition_proxy, related_name="participants")
    formation_name = peewee.CharField(default="")
    number = peewee.IntegerField()
    club = peewee.ForeignKeyField(Club)
    external_id = peewee.CharField(null=True, default=None)

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

    def serialize(self, children={}):
        result = {
            "name": self.get_name(),
            "club": self.club.serialize(),
            "number": self.number,
        }
        if "acrobatics" in children:
            result["acrobatics"] = [
                acro.serialize(children["acrobatics"]) for acro in self.acrobatics
            ]
        result = self.serialize_lower_child(result, "sportsmen", children)
        return result

    @classmethod
    def _load_one(cls, inner_competition, club, number, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.inner_competition == inner_competition and cls.external_id == obj["external_id"])
                for key in ["formation_name"]:
                    setattr(model, key, obj["key"])
                model.club = club
                model.save()
                return model, False
            except cls.DoesNotExist:
                pass
        return cls.create(
            inner_competition=inner_competition,
            formation_name=(obj["formation_name"] if "formation_name" in obj else ""),
            number=number,
            club=club
        ), True

    @classmethod
    def load(cls, inner_competition, objects):
        next_number = inner_competition.competition.get_max_number()
        next_number += 1
        for obj in objects:
            club = Club.get(Club.external_id == obj["club"])
            model, created = cls._load_one(inner_competition, club, next_number, obj)
            if created:
                next_number += 1
            Sportsman.delete().where(Sportsman.participant == model).execute()
            Acrobatic.delete().where(Acrobatic.participant == model).execute()
            Sportsman.load(
                participant=model,
                objects=obj["sportsmen"],
            )
            Acrobatic.load(model, obj["acrobatics"])


class Sportsman(BaseModel):
    indexes = (
        (("external_id"), False),
    )
    participant = peewee.ForeignKeyField(Participant, related_name="sportsmen")
    first_name = peewee.CharField()
    last_name = peewee.CharField()
    gender = peewee.CharField(max_length=1, choices=(("F", "Female"), ("M", "Male"),))

    @property
    def full_name(self):
        return "{} {}".format(self.last_name, self.first_name)

    @classmethod
    def load(cls, participant, objects):
        for obj in objects:
            cls.create(participant=participant, **obj)

    def serialize(self, children={}):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "gender": self.gender,
        }


class Acrobatic(BaseModel):
    class Meta:
        order_by = ["number"]

    participant = peewee.ForeignKeyField(Participant, related_name="acrobatics")
    number = peewee.IntegerField()
    description = peewee.CharField()
    score = peewee.DoubleField()

    def serialize(self, children={}):
        return {
            "number": self.number,
            "description": self.description,
            "score": self.score,
        }

    @classmethod
    def load(cls, participant, objects):
        for number, obj in enumerate(objects, start=1):
            cls.create(participant=participant, number=number, **obj)
