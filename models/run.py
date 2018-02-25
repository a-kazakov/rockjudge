from fractions import Fraction as frac

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
            (("heat", "heat_secondary", "participant"), False),
        )
        order_by = ["heat", "heat_secondary", "participant"]

    participant = peewee.ForeignKeyField(Participant, on_delete="RESTRICT")
    tour = peewee.ForeignKeyField(Tour, related_name="runs", on_delete="CASCADE")
    heat = peewee.IntegerField()
    heat_secondary = peewee.IntegerField()
    status = peewee.CharField(max_length=2, default="OK")  # OK, NP, DQ
    program_name = peewee.CharField(null=True)
    acrobatics = postgres_ext.BinaryJSONField(default={})
    inherited_data = postgres_ext.BinaryJSONField(default={})

    RO_PROPS = ["program_name", "status", "performed", "disqualified", "inherited_data"]
    RW_PROPS = ["heat"]

    PF_SCHEMA = {
        "scores": {},
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
        "tour": None,
    }

    def get_data_to_inherit(self):
        ordered_djs = list(self.tour.discipline_judges)
        scores_index = {s.discipline_judge_id: s for s in self.scores}
        ordered_scores = [scores_index.get(dj.id, None) for dj in ordered_djs]
        return self.tour.scoring_system.get_run_data_to_inherit(
            run_id=self.id,
            scores_ids=[(s.id if s is not None else None) for s in ordered_scores],
            scores=[(s.score_data if s is not None else {}) for s in ordered_scores],
            judges_roles=[dj.role for dj in ordered_djs],
            inherited_data=self.inherited_data,
            acro_scores=self.get_acro_scores(),
            status=self.status,
            tour_name=self.tour.name,
        )

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
        ws_message.add_tour_results_update(self.tour_id)

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
        ws_message.add_tour_results_update(self.tour_id)

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
        ws_message.add_tour_results_update(self.tour_id)

    def get_acro_scores(self):
        acro_list = [acro["score"] for acro in self.acrobatics]
        for override in self.acrobatic_overrides:
            acro_list[override.acrobatic_idx] = override.score
        return acro_list

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
        ordered_djs = list(self.tour.discipline_judges)
        scores_index = {s.discipline_judge_id: s for s in self.scores}
        ordered_scores = [scores_index.get(dj.id, None) for dj in ordered_djs]
        scores_obj = self.tour.scoring_system.get_run_scores(
            run_id=self.id,
            scores_ids=[(s.id if s is not None else None) for s in ordered_scores],
            scores=[(s.score_data if s is not None else {}) for s in ordered_scores],
            judges_ids=[j.id for j in ordered_djs],
            judges_roles=[j.role for j in ordered_djs],
            inherited_data=self.inherited_data,
            acro_scores=self.get_acro_scores(),
            status=self.status,
            tour_name=self.tour.name,
        )
        result = self.serialize_props()
        result["total_score"] = scores_obj["total_run_score"]
        result["verbose_total_score"] = scores_obj["verbose_run_score"]
        result = self.serialize_upper_child(result, "tour", children)
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
