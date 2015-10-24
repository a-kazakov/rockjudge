import json
import peewee

from models.base_model import BaseModel
from models.judge import Judge
from models.run import Run


class Score(BaseModel):
    class Meta:
        order_by = ["judge"]

    PF_SCHEMA = {
        "judge": {},
        "run": {
            "tour": {},
        }
    }

    run = peewee.ForeignKeyField(Run, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")

    def get_data(self):
        return json.loads(self.score_data)

    def set_data(self, score_data):
        self.score_data = json.dumps(score_data)
        self.save()

    def update_model(self, new_data, ws_message):
        self.run.tour.scoring_system.update_score(self, new_data)
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_model_update(
            model_type=Run,
            model_id=self.run_id,
        )
        ws_message.add_message("tour_results_changed", {"tour_id": self.run.tour_id})

    def serialize(self, children={}, judge=None):
        return {
            "judge_id": self.judge_id,
            "data": self.run.tour.scoring_system.serialize_score(self, judge=judge)
        }
