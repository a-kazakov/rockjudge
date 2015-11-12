import json
import peewee

from models.base_model import BaseModel
from models.participant import Participant


class Program(BaseModel):
    class Meta:
        order_by = ["name"]
        indexes = (
            (("participant", "external_id",), True),
        )

    name = peewee.CharField()
    participant = peewee.ForeignKeyField(Participant, related_name="programs", null=True)
    acrobatics_json = peewee.TextField(default="[]")
    default_for = peewee.CharField(null=True)
    external_id = peewee.CharField(null=True)

    RW_PROPS = ["name", "default_for", "external_id"]

    PF_CHILDREN = {
        "participant": None,
        "runs": None,
    }

    @staticmethod
    def serialize_acrobatics(raw_data):
        return json.dumps(
            [{
                "description": str(sp["description"]),
                "score": float(sp["score"]),
            } for sp in raw_data],
            ensure_ascii=False, check_circular=False)

    @property
    def acrobatics(self):
        return json.loads(self.acrobatics_json)

    @acrobatics.setter
    def acrobatics(self, value):
        self.acrobatics_json = self.serialize_acrobatics(value)

    @classmethod
    def load_models(cls, participant, objects):
        prepared = [
            cls.gen_model_kwargs(
                obj,
                participant=participant,
                acrobatics=obj["acrobatics"],
            ) for obj in objects
        ]
        list(cls.load_models_base(objects, prepared, participant=participant))

    @classmethod
    def create_model(cls, participant, data, ws_message):
        kwargs = cls.gen_model_kwargs(
            data,
            participant=participant,
            acrobatics_json=cls.serialize_acrobatics(data["acrobatics"])
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
        if "acrobatics" in new_data:
            self.acrobatics = new_data["acrobatics"]
        else:
            print(new_data)
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
        self.participant = None
        self.save()
        ws_message.add_model_update(
            model_type=Participant,
            model_id=participant_id,
            schema={
                "programs": {}
            }
        )

    def serialize(self, children={}):
        result = self.serialize_props()
        result["acrobatics"] = self.acrobatics
        result = self.serialize_upper_child(result, "participant", children)
        result = self.serialize_lower_child(result, "runs", children)
        return result
