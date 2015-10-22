import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.proxies import competition_proxy


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

    RW_PROPS = ["name", "city", "external_id"]

    @classmethod
    def load_models(cls, competition, objects):
        list(cls.load_models_base(objects, competition=competition))

    @classmethod
    def create_model(cls, competition, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data, competition=competition)
        cls.create(**create_kwargs)
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=competition.id,
            schema={
                "clubs": {},
            }
        )

    def update_model(self, new_data, ws_message):
        super().update_model(new_data)
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=self.competition_id,
            schema={
                "clubs": {}
            }
        )

    def delete_model(self, ws_message):
        from models import Participant
        if self.participants.where(~(Participant.discipline >> None)).count() > 0:
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

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_lower_child(result, "participants", children)
        return result
