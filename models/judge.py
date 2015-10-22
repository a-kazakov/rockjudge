import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.competition import Competition


class Judge(BaseModel):
    class Meta:
        order_by = ["-sp", "number", "role_description"]
        indexes = (
            (("competition", "external_id",), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="judges")
    name = peewee.CharField()
    category = peewee.CharField()
    role = peewee.CharField(default="")
    role_description = peewee.CharField(default="")
    number = peewee.CharField(default="")
    sp = peewee.IntegerField(default=0)
    external_id = peewee.CharField(null=True)

    RW_PROPS = ["name", "category", "role", "role_description", "number", "sp", "external_id"]

    @classmethod
    def load_models(cls, competition, objects):
        list(cls.load_models_base(objects, competition=competition))

    @classmethod
    def create_model(cls, competition, data, ws_message):
        kwargs = cls.gen_model_kwargs(data, competition=competition)
        cls.create(**kwargs)
        ws_message.add_message("reload_data")

    def update_model(self, new_data, ws_message):
        super().update_model(new_data)
        ws_message.add_model_update(
            model_type=Competition,
            model_id=self.competition_id,
            schema={
                "judges": {}
            }
        )

    def delete_model(self, ws_message):
        if self.get_attr_count("score_set") > 0:
            raise ApiError("errors.judge.delete_with_scores")
        self.delete_instance()
        ws_message.add_message("reload_data")

    def get_sorting_key(self):  # TODO: move this logic to scoring system
        if self.role == "head_judge":
            primary_key = 0
        elif self.role == "":
            primary_key = 1
        elif self.role in ["dance_judge", "acro_judge"]:
            primary_key = 2
        else:
            primary_key = 3
        return (self.sp, primary_key, self.number, self.role_description, self.name)

    def serialize(self, children={}):
        return self.serialize_props()
