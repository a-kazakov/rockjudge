import peewee

from playhouse import postgres_ext

from exceptions import ApiError
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
    status = peewee.CharField(max_length=2, default="OK")  # OK, NP, DQ
    program_name = peewee.CharField(null=True)
    acrobatics = postgres_ext.BinaryJSONField(default={})
    inherited_data = postgres_ext.BinaryJSONField(default={})

    RO_PROPS = ["program_name", "status", "performed", "disqualified", "inherited_data"]
    RW_PROPS = ["heat"]

    PF_SCHEMA = {
        "scores": {},
        "participant": {},
        "acrobatic_overrides": {},
        "tour": {
            "discipline": {
                "discipline_judges": {},
            }
        }
    }
    PF_CHILDREN = {
        "acrobatics": {
            "acrobatic_overrides": {},
        },
        "participant": None,
        "scores": None,
    }

    def get_data_to_inherit(self):
        return self.tour.scoring_system.get_run_data_to_inherit(self, self.tour.discipline_judges)

    def load_acrobatics(self, program, ws_message):
        if program is None:
            self.program_name = None
            self.acrobatics = []
        else:
            self.program_name = program.name
            self.acrobatics = program.acrobatics
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "acrobatics": {},
                "scores": {},
            },
        )

    def create_scores(self):
        from models import Score
        scores_judge_ids = {score.discipline_judge_id for score in self.scores}
        for discipline_judge in self.tour.discipline_judges:
            if discipline_judge.id not in scores_judge_ids:
                Score.create(
                    run=self,
                    discipline_judge=discipline_judge,
                )

    def get_acrobatic_override(self, acrobatic_idx):
        for override in self.acrobatic_overrides:
            if override.acrobatic_idx == acrobatic_idx:
                return override
        return None

    def set_acrobatic_override(self, acrobatic_idx, score, ws_message):
        from models import AcrobaticOverride
        override = self.get_acrobatic_override(acrobatic_idx)
        if score is not None:
            score = max(0, score)
        if override is None:
            if score is not None:
                AcrobaticOverride.create(
                    run=self,
                    acrobatic_idx=acrobatic_idx,
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

    def set_status(self, new_value, ws_message):
        if new_value == self.status:
            return
        if self.tour.finalized:
            raise ApiError("errors.run.set_status_on_finalized")
        if new_value not in ["OK", "NP", "DQ"]:
            raise ApiError("errors.run.bad_status")
        self.status = new_value
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={}
        )
        ws_message.add_message("tour_results_changed", {"tour_id": self.tour_id})

    @property
    def performed(self):
        return self.status == "OK"

    @property
    def disqualified(self):
        return self.status == "DQ"

    def update_model(self, new_data, ws_message):
        if self.tour.finalized:
            raise ApiError("errors.run.modify_finalized")
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=Tour,
            model_id=self.tour_id,
            schema={
                "runs": {},
            }
        )

    def reset(self, ws_message):
        from models.score import Score
        from models.acrobatic_override import AcrobaticOverride
        if self.tour.finalized:
            raise ApiError("errors.run.modify_finalized")
        Score.update(score_data={}, confirmed=False).where(Score.run == self).execute()
        AcrobaticOverride.delete().where(AcrobaticOverride.run == self).execute()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "scores": {},
                "acrobatics": {},
            }
        )
        ws_message.add_message("tour_results_changed", {"tour_id": self.tour_id})

    def serialize_acrobatics(self, children=None):
        acro_list = []
        for idx, acro in enumerate(self.acrobatics):
            acro["original_score"] = acro["score"]
            override = self.get_acrobatic_override(idx)
            if override is not None:
                acro["score"] = override.score
            acro["has_override"] = (override is not None)
            acro_list.append(acro)
        return acro_list

    def serialize(self, children={}, discipline_judges=None):
        scores_obj = self.tour.scoring_system.get_run_scores(self, discipline_judges=discipline_judges)
        result = self.serialize_props()
        result["total_score"] = scores_obj["total_run_score"]
        result["verbose_total_score"] = scores_obj["verbose_run_score"]
        result = self.serialize_upper_child(result, "participant", children)
        if discipline_judges is not None:
            rev_discipline_judges = {
                discipline_judge.id: discipline_judge
                for discipline_judge in discipline_judges
            }
        result = self.serialize_lower_child(
            result, "scores", children,
            lambda x, c: x.serialize(
                discipline_judge=(rev_discipline_judges[x.discipline_judge_id]
                                  if discipline_judges is not None
                                  else None),
                children=c))
        if "acrobatics" in children:
            result["acrobatics"] = self.serialize_acrobatics(children=children["acrobatics"])
        return result

    def export(self):
        result = self.serialize_props()
        result.update({
            "id": self.id,
            "participant_id": self.participant_id,
            "acrobatics": self.serialize_acrobatics(),
            "scores": [score.export() for score in self.scores]
        })
        return result
