import peewee

from models.base_model import BaseModel
from models.client import Client
from models.competition import Competition


class ClientAuth(BaseModel):
    class Meta:
        indexes = (
            (("client", "competition"), True),
        )
        order_by = ["client"]

    client = peewee.ForeignKeyField(Client, related_name="authentications", on_delete="CASCADE")
    competition = peewee.ForeignKeyField(Competition, related_name="clients", on_delete="RESTRICT")
    access_level = peewee.CharField(default="none")
    # Possible levels:
    # - none
    # - admin
    # - presenter
    # - judge_X
    # - any_judge

    RW_PROPS = ["access_level"]
    RO_PROPS = ["client_id"]

    @classmethod
    def create_model(cls, client, competition, ws_message):
        result, created = cls.get_or_create(
            client=client,
            competition=competition,
        )
        ws_message.add_model_update(
            model_type=Competition,
            model_id=competition.id,
            schema={
                "clients": {},
            }
        )
        ws_message.add_message("access_levels_changed", {"client_id": client.id})
        return result

    def update_model(self, new_data, ws_message):
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=ClientAuth,
            model_id=self.id,
            schema={}
        )
        ws_message.add_message("access_levels_changed", {"client_id": self.client_id})

    def delete_model(self, ws_message):
        ws_message.add_model_update(
            model_type=Competition,
            model_id=self.competition_id,
            schema={
                "clients": {},
            }
        )
        ws_message.add_message("access_levels_changed", {"client_id": self.client_id})
        self.delete_instance()

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "competition", children)
        return result
