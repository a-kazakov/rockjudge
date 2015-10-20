import peewee

from db import BaseModel
from exceptions import ApiError


competition_proxy = peewee.Proxy()
discipline_proxy = peewee.Proxy()

class Club(BaseModel):
    class Meta:
        indexes = (
            (("competition", "external_id"), False),
        )
        order_by = ["city", "name"]

    competition = peewee.ForeignKeyField(competition_proxy, null=True, related_name="clubs")
    name = peewee.CharField()
    city = peewee.CharField()
    external_id = peewee.CharField(null=True, default=None)

    @classmethod
    def create_model(cls, competition, data, ws_message):
        create_kwargs = {
            key: data[key]
            for key in ["name", "city", "external_id"]
        }
        create_kwargs["competition"] = competition
        cls.create(**create_kwargs)
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=competition.id,
            schema={
                "clubs": {},
            }
        )

    def delete_model(self, ws_message):
        # If this judge has any scores, than this judge can't be deleted
        if self.participants.where(Participant.discipline != None).count() > 0:
            raise ApiError("errors.club.delete_with_participants")
        competition_id = self.competition_id
        self.competition = None
        self.save()
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=competition_id,
            schema={
                "clubs": {},
            }
        )

    def update_data(self, new_data, ws_message):
        for key in ["name", "city", "external_id"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        self.save()
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=self.competition_id,
            schema={
                "clubs": {}
            }
        )

    def serialize(self, children={}):
        result = {
            "name": self.name,
            "city": self.city,
            "external_id": self.external_id,
        }
        result = self.serialize_lower_child(result, "participants", children)
        return result

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
            (("discipline", "external_id"), False),
        )
        order_by = ["number"]

    discipline = peewee.ForeignKeyField(discipline_proxy, null=True, related_name="participants")
    formation_name = peewee.CharField(default="")
    coaches = peewee.CharField()
    number = peewee.IntegerField()
    club = peewee.ForeignKeyField(Club, related_name="participants")
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

    def update_data(self, new_data, ws_message):
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
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "club": {},
                "sportsmen": {},
                "acrobatics": {},
            }
        )

    @classmethod
    def create_model(cls, discipline, data, ws_message):
        create_kwargs = {
            key: data[key]
            for key in ["formation_name", "number", "coaches"]
        }
        if "external_id" in data:
            create_kwargs["external_id"] = data["external_id"]
        club = Club.get((Club.id == data["club_id"]) & (Club.competition == discipline.competition_id))
        create_kwargs["club"] = club
        create_kwargs["discipline"] = discipline
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
        result = {
            "name": self.get_name(),
            "formation_name": self.formation_name,
            "coaches": self.coaches,
            "number": self.number,
        }
        if "acrobatics" in children:
            result["acrobatics"] = [
                acro.serialize(children["acrobatics"]) for acro in self.acrobatics
            ]
        result = self.serialize_upper_child(result, "club", children)
        result = self.serialize_lower_child(result, "sportsmen", children)
        return result

    @classmethod
    def _load_one(cls, discipline, club, number, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.discipline == discipline and cls.external_id == obj["external_id"])
                for key in ["formation_name", "coaches"]:
                    setattr(model, key, obj["key"])
                model.club = club
                model.save()
                return model, False
            except cls.DoesNotExist:
                pass
        return cls.create(
            discipline=discipline,
            formation_name=(obj["formation_name"] if "formation_name" in obj else ""),
            coaches=(obj["coaches"] if "coaches" in obj else ""),
            number=number,
            club=club
        ), True

    @classmethod
    def load(cls, discipline, objects):
        next_number = discipline.competition.get_max_number()
        next_number += 1
        for obj in objects:
            club = Club.get(Club.external_id == obj["club"])
            model, created = cls._load_one(discipline, club, next_number, obj)
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
    class Meta:
        indexes = (
            (("external_id"), False),
        )
        order_by = ["gender", "last_name", "first_name"]

    participant = peewee.ForeignKeyField(Participant, related_name="sportsmen")
    first_name = peewee.CharField()
    last_name = peewee.CharField()
    year_of_birth = peewee.IntegerField()
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
            "year_of_birth": self.year_of_birth,
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
