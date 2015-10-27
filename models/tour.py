import peewee
import random

from exceptions import ApiError
from models.base_model import BaseModel
from models.discipline import Discipline
from models.proxies import tour_proxy
from scoring_systems import get_scoring_system


class Tour(BaseModel):
    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, default=None, related_name="prev_tour")
    num_advances = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    finalized = peewee.BooleanField(default=False)
    active = peewee.BooleanField(default=False)
    hope_tour = peewee.BooleanField(default=False)
    total_advanced = peewee.IntegerField(default=0)
    discipline = peewee.ForeignKeyField(Discipline, related_name="raw_tours")
    scoring_system_name = peewee.CharField()

    RW_PROPS = ["name", "num_advances", "participants_per_heat", "hope_tour", "scoring_system_name"]
    RO_PROPS = ["finalized", "active"]

    PF_CHILDREN = {
        "discipline": None,
        "judges": None,
        "runs": {
            "runs": None,
            "discipline": {
                "discipline_judges": {},
            },
        }
    }

    def full_prefetch(self):
        self.prefetch({
            "runs": {
                "scores": {},
                "acrobatic_overrides": {},
                "participant": {
                    "club": {},
                },
            },
            "discipline": {
                "competition": {
                    "judges": {},
                },
            }
        })

    def estimate_participants(self):
        try:
            prev_tour = self.get_prev_tour(throw=True)
            prev_tour.full_prefetch()
            if self.hope_tour:
                return [
                    row["run"].participant
                    for row in prev_tour.scoring_system.get_tour_results(prev_tour)
                    if not row["advances"]
                ]
            result = []
            while True:
                result += [
                    row["run"].participant
                    for row in prev_tour.scoring_system.get_tour_results(prev_tour)
                    if row["advances"]
                ]
                if prev_tour.hope_tour:
                    prev_tour = prev_tour.get_prev_tour(throw=True)
                    prev_tour.full_prefetch()
                else:
                    break
            return result
        except self.DoesNotExist:
            self.discipline.smart_prefetch({
                "participants": {},
            })
            return self.discipline.participants

    def get_actual_num_advances(self):
        base_value = self.num_advances
        if not self.hope_tour:
            return base_value
        advanced_over_quote = 0
        try:
            tour = self
            while True:
                tour = tour.prev_tour.get()
                advanced_over_quote += tour.total_advanced - tour.num_advances
                if not tour.hope_tour:
                    break
        except self.DoesNotExist:
            pass
        return max(0, base_value - advanced_over_quote)

    def create_participant_runs(self):
        from models import (
            AcrobaticOverride,
            Run,
            Score,
        )
        self.smart_prefetch({
            "runs": {},
        })
        estimated_participants = self.estimate_participants()
        existing_participant_ids = {run.participant_id for run in self.runs}
        new_participant_ids = {participant.id for participant in estimated_participants}
        participant_ids_to_create = new_participant_ids - existing_participant_ids
        participant_ids_to_delete = existing_participant_ids - new_participant_ids
        if len(participant_ids_to_delete) > 0:
            runs_to_delete = Run.select().where(
                (Run.tour == self) &
                (Run.participant << list(participant_ids_to_delete))
            )
            runs_to_delete = list(runs_to_delete)
            Score.delete().where(Score.run << runs_to_delete).execute()
            AcrobaticOverride.delete().where(AcrobaticOverride.run << runs_to_delete).execute()
            Run.delete().where(Run.id << runs_to_delete).execute()
        new_runs = [run for run in self.runs if run.participant_id not in participant_ids_to_delete]
        self.runs = new_runs
        for participant_id in participant_ids_to_create:
            run = Run.create(
                participant=participant_id,
                heat=1,
                tour=self,
            )
            self.runs.append(run)
        participants_rev = {
            p.id: p
            for p in estimated_participants
        }
        for run in self.runs:
            run.create_scores()
            run.acrobatics_json = participants_rev[run.participant_id].acrobatics_json
            run.save()
        self.shuffle_heats(ws_message=None, broadcast=False, shuffle=(len(existing_participant_ids) == 0))

    def shuffle_heats(self, ws_message, shuffle=True, broadcast=True):
        self.smart_prefetch({
            "runs": {},
        })
        if shuffle:
            random.shuffle(self.runs)
        last_heat = len(self.runs) % self.participants_per_heat
        if last_heat == 1:
            last_heat = (self.participants_per_heat + 1) // 2
        for idx, run in enumerate(self.runs):
            run.heat = idx // self.participants_per_heat + 1
            if len(self.runs) - idx <= last_heat:
                run.heat = (len(self.runs) - 1) // self.participants_per_heat + 1
            run.save()
        if broadcast:
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
                schema={
                    "runs": {},
                },
            )

    @classmethod
    def get_active(cls):
        try:
            active_tour = cls.get(cls.active == True)  # NOQA
            return active_tour
        except cls.DoesNotExist:
            return None

    def start(self, ws_message):
        active_tours = list(self.select().where(Tour.active == True))  # NOQA
        for tour in active_tours:
            tour.stop(ws_message=ws_message, broadcast=False)
        self.active = True
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_message("active_tour_update", {"tour_id": self.id})

    def stop(self, ws_message, broadcast=True):
        self.active = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        if broadcast:
            ws_message.add_message("active_tour_update", {"tour_id": None})

    @property
    def discipline_judges(self):
        return list(self.discipline.discipline_judges)

    def get_prev_tour(self, throw=False):
        prev_tours_list = list(self.prev_tour)
        if prev_tours_list == []:
            if throw:
                raise self.DoesNotExist
            return None
        return prev_tours_list[0]

    def check_prev_tour_finalized(self):
        prev_tour = self.get_prev_tour()
        if prev_tour is None:
            return
        if not prev_tour.finalized:
            raise ApiError("errors.tour.prev_not_finailzed")

    def check_next_tour_not_finalized(self):
        if self.next_tour is None:
            return
        if self.next_tour.finalized:
            raise ApiError("errors.tour.next_is_finailzed")

    def init(self, ws_message):
        if self.finalized:
            raise ApiError("error.tour.init_finalized")
        self.check_prev_tour_finalized()
        self.create_participant_runs()
        ws_message.add_message("tour_results_changed", {"tour_id": self.id})
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "runs": {
                    "participant": {
                        "club": {}
                    },
                    "acrobatics": {},
                    "scores": {},
                }
            }
        )

    def finalize(self, ws_message):
        self.check_prev_tour_finalized()
        if self.active:
            self.stop(ws_message)
        self.finalized = True
        self.total_advanced = len([
            None
            for row in self.scoring_system.get_tour_results(self)
            if row["advances"]
        ])
        self.save()
        if self.next_tour:
            self.next_tour.init(ws_message)
        ws_message.add_message("tour_results_changed", {"tour_id": self.id})
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id
        )

    def unfinalize(self, ws_message):
        self.check_next_tour_not_finalized()
        self.finalized = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id
        )

    @property
    def scoring_system(self):
        return get_scoring_system(self)

    @classmethod
    def create_model(cls, discipline, add_after, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data, discipline=discipline)
        tour = Tour.create(**create_kwargs)
        if add_after is None:
            if discipline.first_tour is not None and discipline.first_tour.finalized:
                raise ApiError("errors.tour.add_before_finalized")
            tour.next_tour = discipline.first_tour
            discipline.first_tour = tour
            discipline.save()
            tour.save()
        else:
            for prev_tour in discipline.tours:
                if prev_tour.id == add_after:
                    if prev_tour.next_tour is not None and prev_tour.next_tour.finalized:
                        raise ApiError("errors.tour.add_before_finalized")
                    tour.next_tour = prev_tour.next_tour
                    prev_tour.next_tour = tour
                    prev_tour.save()
                    tour.save()
                    break
            else:
                raise ApiError("errors.tour.invalid_add_after_id")
        ws_message.add_model_update(
            model_type=Discipline,
            model_id=discipline.id,
            schema={
                "tours": {},
            }
        )

    def update_model(self, new_data, ws_message):
        if self.finalized:
            for key in ["num_advances", "hope_tour", "scoring_system_name"]:
                if key in new_data:
                    raise ApiError("errors.tour.update_finalized")
        self.update_model_base(new_data)
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )

    def delete_model(self, ws_message):
        if self.finalized:
            raise ApiError("errors.tour.delete_finalized")
        # We don't actually delete the tour. Just removing it from linked list.
        discipline = self.discipline
        prev_tour = self.get_prev_tour()
        if prev_tour is None:  # This is the first_tour
            discipline.first_tour = self.next_tour
            discipline.save()
        else:
            prev_tour.next_tour = self.next_tour
            prev_tour.save()
        self.next_tour = None
        self.save()
        ws_message.add_model_update(
            model_type=Discipline,
            model_id=discipline.id,
            schema={
                "tours": {},
            }
        )
        ws_message.add_message("active_tour_update")

    def get_serialized_results(self):
        tour_results = self.scoring_system.get_tour_results(self)
        for row in tour_results:
            run = row["run"]
            participant = run.participant.serialize()
            participant["id"] = run.participant.id
            participant["club"] = run.participant.club.serialize()
            row["participant"] = participant
            row["acrobatics"] = run.serialize_acrobatics()
            del row["run"]
        result = self.serialize_props()
        judges = []
        sorted_discipline_judges = sorted(self.discipline_judges, key=lambda x: x.get_sorting_key())
        for discipline_judge in sorted_discipline_judges:
            discipline_judge_s = discipline_judge.judge.serialize()
            discipline_judge_s["id"] = discipline_judge.id
            discipline_judge_s["role"] = discipline_judge.role
            judges.append(discipline_judge_s)
        result.update({
            "discipline_name": self.discipline.name,
            "judges": judges,
            "next_tour_id": self.next_tour_id,
            "results": tour_results,
        })
        return result

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "discipline", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(
            result, "runs", children,
            lambda x, c: x.serialize(discipline_judges=list(self.discipline_judges), children=c))
        return result


tour_proxy.initialize(Tour)
