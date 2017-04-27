import peewee

from playhouse import postgres_ext

from exceptions import ApiError
from models.base_model import BaseModel
from models.discipline_judge import DisciplineJudge
from models.run import Run


class Score(BaseModel):
    PF_SCHEMA = {
        "discipline_judge": {},
        "run": {
            "tour": {},
        }
    }

    run = peewee.ForeignKeyField(Run, related_name="scores")
    discipline_judge = peewee.ForeignKeyField(DisciplineJudge)
    score_data = postgres_ext.BinaryJSONField(default={})
    confirmed = peewee.BooleanField(default=False)

    def get_sorting_key(self, discipline_judge=None):
        return self.discipline_judge.get_sorting_key()

    def get_data(self):
        return dict(self.score_data)

    def set_data(self, score_data):
        self.score_data = score_data
        self.save()

    def confirm(self, ws_message):
        if self.run.tour.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        self.confirmed = True
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )

    def unconfirm(self, ws_message):
        if self.run.tour.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        self.confirmed = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )

    def update_model(self, new_data, ws_message):
        if self.confirmed:
            if "force" not in new_data or not new_data["force"]:
                return
        if self.run.tour.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        self.run.tour.scoring_system.update_score(self, new_data["score_data"])
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_model_update(
            model_type=Run,
            model_id=self.run_id,
        )
        ws_message.add_message("tour_results_changed", {"tour_id": self.run.tour_id})

    def serialize(self, children={}, discipline_judge=None):
        if discipline_judge is not None:
            self.discipline_judge = discipline_judge
        return {
            "discipline_judge_id": self.discipline_judge_id,
            "data": self.run.tour.scoring_system.serialize_score(self, discipline_judge=discipline_judge),
            "confirmed": self.confirmed,
        }

    def export(self):
        return self.serialize()
