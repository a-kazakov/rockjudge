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
    PF_CHILDREN = {
        "run": None,
    }

    run = peewee.ForeignKeyField(Run, related_name="scores", on_delete="CASCADE")
    discipline_judge = peewee.ForeignKeyField(DisciplineJudge)
    score_data = postgres_ext.BinaryJSONField(default={})
    confirmed = peewee.BooleanField(default=False)

    def get_sorting_key(self, discipline_judge=None):
        return self.discipline_judge.get_sorting_key()

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
            if not new_data.get("force", False):
                return
        if self.run.tour.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        self.score_data = self.run.tour.scoring_system.get_updated_score(
            score_id=self.id,
            score_data=self.score_data,
            judge_role=self.discipline_judge.role,
            client_data=new_data["score_data"],
        )
        self.save()
        # postprocessor = getattr(
        #     self.run.tour.scoring_system,
        #     "postprocess_judge_scores",
        #     None,
        # )
        # if postprocessor is not None:
        #     other_scores = Score.select().where(
        #         Score.discipline_judge == self.discipline_judge
        #     )
        #     changes = postprocessor(
        #         base_score_id=self.id,
        #         scores_data={
        #             score.id: score.score_data
        #             for score in other_scores
        #         },
        #         judge_role=self.discipline_judge.role,
        #     )
        #     for score_id, score_data in changes:
        #         Score.update({
        #             Score.score_data: score_data,
        #         }).where(Score.id == score_id).execute()
        #         ws_message.add_model_update(
        #             model_type=self.__class__,
        #             model_id=score_id,
        #             schema={
        #                 "run": {},
        #             },
        #         )
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "run": {},
            },
        )
        ws_message.add_tour_results_update(self.run.tour_id)

    def serialize(self, children={}, discipline_judge=None):
        if discipline_judge is None:
            discipline_judge = self.discipline_judge
        result = {
            "discipline_judge_id": discipline_judge.id,
            "data": self.run.tour.scoring_system.serialize_score(
                score_id=self.id,
                score_data=self.score_data,
                judge_role=discipline_judge.role,
                acro_scores=self.run.get_acro_scores(),
            ),
            "confirmed": self.confirmed,
        }
        result = self.serialize_upper_child(result, "run", children)
        return result

    def export(self):
        return self.serialize()
