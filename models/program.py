import json
import peewee

from playhouse import postgres_ext

from models.base_model import BaseModel
from models.participant import Participant


def serialize_program_acrobatics(raw_data):
    return json.dumps([
        {
            "description": str(sp["description"]),
            "score": float(sp["score"]),
        } for sp in raw_data
    ], check_circular=False)


class Program(BaseModel):
    class Meta:
        order_by = ["name"]
        indexes = (
            (("participant", "external_id",), True),
        )

    name = peewee.CharField()
    participant = peewee.ForeignKeyField(Participant, related_name="programs", on_delete="RESTRICT")
    acrobatics = postgres_ext.BinaryJSONField(default=[], dumps=serialize_program_acrobatics)
    default_for = peewee.CharField(null=True)
    external_id = peewee.CharField(null=True)

    RW_PROPS = ["name", "default_for", "external_id", "acrobatics"]

    PF_CHILDREN = {
        "participant": None,
        "runs": None,
    }

    @classmethod
    def load_models(cls, participant, objects):
        prepared = [
            cls.gen_model_kwargs(
                obj,
                participant=participant,
            ) for obj in objects
        ]
        list(cls.load_models_base(objects, prepared, participant=participant))

    @classmethod
    def create_model(cls, participant, data, ws_message):
        kwargs = cls.gen_model_kwargs(
            data,
            participant=participant,
        )
        model = cls.create(**kwargs)
        ws_message.add_model_update(
            model_type=participant.__class__,
            model_id=participant.id,
            schema={
                "programs": {}
            }
        )
        ws_message.add_model_update(
            model_type=model.__class__,
            model_id=model.id,
            schema={}
        )

    def update_model(self, new_data, ws_message):
        from models import Participant
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=Participant,
            model_id=self.participant_id,
            schema={
                "programs": {}
            }
        )
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={}
        )

    def delete_model(self, ws_message):
        from models import Participant
        participant_id = self.participant_id
        self.delete_instance()
        ws_message.add_model_update(
            model_type=Participant,
            model_id=participant_id,
            schema={
                "programs": {}
            }
        )

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "participant", children)
        return result

    def export(self):
        return self.serialize_props()
