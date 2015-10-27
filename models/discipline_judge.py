import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.judge import Judge
from models.discipline import Discipline


class DisciplineJudge(BaseModel):
    indexes = (
        (("discipline",), False,),
        (("discipline", "judge"), True,),
    )

    PF_SCHEMA = {
        "judge": {}
    }

    PF_CHILDREN = {
        "discipline": None,
        "judge": None,
    }

    RW_PROPS = ["role"]

    discipline = peewee.ForeignKeyField(Discipline, related_name="discipline_judges", null=True)
    judge = peewee.ForeignKeyField(Judge)
    role = peewee.CharField()

    @classmethod
    def load_models(cls, discipline, objects):
        rev_judges = {
            judge.external_id: judge
            for judge in discipline.competition.judges
        }
        new_judges_data = [
            dict(
                [("judge_id", rev_judges[obj["judge"]].id)] +
                list(obj.items())
            ) for obj in objects
        ]
        discipline.set_judges(new_judges_data)

    @classmethod
    def create_model(cls, discipline, judge, data, ws_message):
        kwargs = cls.gen_model_kwargs(data, discipline=discipline, judge=judge)
        cls.create(**kwargs)
        ws_message.add_message("reload_data")

    def update_model(self, new_data, ws_message):
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=Discipline,
            model_id=self.discipline_id,
            schema={
                "judges": {},
            }
        )

    def delete_model(self, ws_message):
        from models import Tour
        num_finalized_tours = self.discipline.raw_tours.where(Tour.finalized == True).count()  # NOQA
        if num_finalized_tours > 0:
            raise ApiError("errors.discipline_judge.delete_with_finalized")
        if self.get_attr_count("score_set") > 0:
            raise ApiError("errors.discipline_judge.delete_with_scores")
        self.discipline = None
        self.save()
        ws_message.add_message("reload_data")

    def get_sorting_key(self):
        return self.judge.get_sorting_key()

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "judge", children)
        result = self.serialize_upper_child(result, "discipline", children)
        return result
