import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.competition import Competition


class Judge(BaseModel):
    class Meta:
        order_by = ["sp", "number", "role_description"]
        indexes = (
            (("competition", "external_id",), True),
        )

    competition = peewee.ForeignKeyField(Competition, null=True, related_name="judges")
    number = peewee.CharField(default="")
    name = peewee.CharField()
    category = peewee.CharField()
    role_description = peewee.CharField(default="")
    sp = peewee.IntegerField(default=0)
    external_id = peewee.CharField(null=True)

    RW_PROPS = ["name", "category", "role_description", "number", "sp", "external_id"]

    PF_CHILDREN = {
        "competition": None,
    }

    @classmethod
    def load_models(cls, competition, objects):
        list(cls.load_models_base(objects, competition=competition))

    @classmethod
    def create_model(cls, competition, data, ws_message):
        kwargs = cls.gen_model_kwargs(data, competition=competition)
        cls.create(**kwargs)
        ws_message.add_message("reload_data")

    def update_model(self, new_data, ws_message):
        self.update_model_base(new_data)
        ws_message.add_message("reload_data")

    def delete_model(self, ws_message):
        from models import DisciplineJudge
        discipline_judges_count = DisciplineJudge.select().where(
            (DisciplineJudge.judge == self) &
            (~(DisciplineJudge.discipline >> None))
        ).count()
        if discipline_judges_count > 0:
            raise ApiError("errors.judge.delete_with_disciplines")
        self.competition = None
        self.save()
        ws_message.add_message("reload_data")

    def get_sorting_key(self):  # TODO: move this logic to scoring system
        return (self.sp, self.number, self.role_description, self.name)

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "competition", children)
        result = self.serialize_lower_child(result, "discipline_judges", children)
        return result
