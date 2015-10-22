import peewee

from models.base_model import BaseModel
from models.participant import Participant
from models.tour import Tour


class Run(BaseModel):
    class Meta:
        indexes = (
            (("participant", "tour"), True),
        )
        order_by = ["heat", "participant"]

    participant = peewee.ForeignKeyField(Participant)
    tour = peewee.ForeignKeyField(Tour, related_name="runs")
    heat = peewee.IntegerField()

    RW_PROPS = ["heat"]

    # Controls

    def create_scores(self):
        from models import Score
        scores_judge_ids = {score.judge_id for score in self.scores}
        for judge in self.tour.judges:
            if judge.id not in scores_judge_ids:
                if judge.role != "":
                    Score.create(
                        run=self,
                        judge=judge,
                    )

    def get_score_obj(self, judge):
        from models import Score
        return self.scores.select().where(Score.judge == judge).get()

    def set_score(self, judge, score_data):
        score_obj = self.get_score_obj(judge)
        score_obj.set(score_data)

    def get_score(self, judge):
        score_obj = self.get_score_obj(judge)
        return score_obj.get()

    def get_acrobatic_override(self, acrobatic):
        for override in self.acrobatic_overrides:
            if override.acrobatic_id == acrobatic.id:
                return override
        return None

    def set_acrobatic_override(self, acrobatic, score, ws_message):
        from models import AcrobaticOverride
        override = self.get_acrobatic_override(acrobatic)
        if override is None:
            if score is not None:
                AcrobaticOverride.create(
                    run=self,
                    acrobatic=acrobatic,
                    score=score,
                )
        else:
            if score is not None:
                override.score = score
                override.save()
            else:
                override.delete_instance()

        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "acrobatics": {},
                "scores": {},
            },
        )
        ws_message.add_message("tour_results_changed", {"tour_id": self.tour_id})

    def update_model(self, new_data, ws_message):
        super().update_model(new_data)
        ws_message.add_model_update(
            model_type=Tour,
            model_id=self.tour_id,
            schema={
                "runs": {},
            }
        )

    def serialize_acrobatics(self, children=None):
        acro_list = []
        for acro in self.participant.acrobatics:
            serialized = acro.serialize()
            serialized["id"] = acro.id
            override = self.get_acrobatic_override(acro)
            serialized["original_score"] = serialized["score"]
            if override is not None:
                serialized["score"] = override.score
            acro_list.append(serialized)
        return acro_list

    def serialize(self, children={}, judges=None):
        scores_obj = self.tour.scoring_system.get_run_scores(self, judges=judges)
        result = self.serialize_props()
        result["total_score"] = scores_obj["total_run_score"]
        result = self.serialize_upper_child(result, "participant", children)
        result = self.serialize_lower_child(result, "scores", children)
        if "acrobatics" in children:
            result["acrobatics"] = self.serialize_acrobatics(children=children["acrobatics"])
        return result
