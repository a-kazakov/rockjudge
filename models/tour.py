import peewee
import random

from collections import defaultdict

from playhouse import postgres_ext

from exceptions import ApiError
from models.base_model import BaseModel
from models.discipline import Discipline
from models.proxies import tour_proxy
from models.proxies import competition_proxy
from protection.features_restriction import check_permissions
from scoring_systems import get_scoring_system

from webserver.websocket import WsMessage


class Tour(BaseModel):
    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, default=None, related_name="prev_tour")
    num_advances = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    default_program = peewee.CharField(default="")
    finalized = peewee.BooleanField(default=False)
    active = peewee.BooleanField(default=False)
    hope_tour = peewee.BooleanField(default=False)
    total_advanced = peewee.IntegerField(default=0)
    discipline = peewee.ForeignKeyField(Discipline, related_name="raw_tours", on_delete="RESTRICT")
    scoring_system_name = peewee.CharField()
    cached_results = postgres_ext.BinaryJSONField(null=True, default=None)

    RW_PROPS = ["name", "num_advances", "participants_per_heat", "hope_tour", "scoring_system_name", "default_program"]
    RO_PROPS = ["finalized", "active"]

    PF_CHILDREN = {
        "discipline": None,
        "runs": {
            "runs": None,
            "discipline": {
                "discipline_judges": None,
            },
        },
        "results": {
            "runs": {
                "scores": None,
                "acrobatic_overrides": None,
            },
            "discipline": {
                "discipline_judges": None,
            },
        },
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
                run_by_id = {run.id: run for run in prev_tour.runs}
                return [
                    (run_by_id[row["run_id"]].participant, run_by_id[row["run_id"]].get_data_to_inherit())
                    for row in prev_tour.results
                    if not row["advances"] and not run_by_id[row["run_id"]].disqualified
                ]
            result = []
            while True:
                run_by_id = {run.id: run for run in prev_tour.runs}
                result += [
                    (run_by_id[row["run_id"]].participant, run_by_id[row["run_id"]].get_data_to_inherit())
                    for row in prev_tour.results
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
            return [(p, {}) for p in self.discipline.participants]

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
        # Make sets
        estimated_participants = []
        inherited_data = {}
        for participant, data in self.estimate_participants():
            estimated_participants.append(participant)
            inherited_data[participant.id] = data
        existing_participant_ids = {run.participant_id for run in self.runs}
        new_participant_ids = {participant.id for participant in estimated_participants}
        participant_ids_to_create = new_participant_ids - existing_participant_ids
        participant_ids_to_delete = existing_participant_ids - new_participant_ids
        # Delete runs
        if len(participant_ids_to_delete) > 0:
            runs_to_delete = Run.select().where(
                (Run.tour == self) &
                (Run.participant << list(participant_ids_to_delete))
            )
            runs_to_delete = list(runs_to_delete)
            Score.delete().where(Score.run << runs_to_delete).execute()
            AcrobaticOverride.delete().where(AcrobaticOverride.run << runs_to_delete).execute()
            Run.delete().where(Run.id << runs_to_delete).execute()
        # Create runs
        runs_to_create = [
            {
                "participant": participant_id,
                "heat": 0,
                "heat_secondary": random.randint(0, 10**9),
                "tour": self,
            } for participant_id in participant_ids_to_create
        ]
        if len(runs_to_create) > 0:
            Run.insert_many(runs_to_create).execute()
        # Refetch all runs
        self.smart_prefetch({
            "runs": {
                "discipline": {
                    "discipline_judges": {},
                },
                "participant": {},
                "scores": {},
            },
        })
        # Load acrobatics (N queries)
        if self.default_program != "":
            for run in self.runs:
                run.load_acrobatics(run.participant.get_default_program(self.default_program), WsMessage())
        # Load inherited data (N queries)
        for run in self.runs:
            run.inherited_data = (
                inherited_data[run.participant_id]
                if run.participant_id in inherited_data
                else {}
            )
            run.save()
        # Create scores
        scores_to_create = []
        for run in self.runs:
            scores_judge_ids = {score.discipline_judge_id for score in run.scores}
            scores_to_create += [
                {
                    "run": run,
                    "discipline_judge": discipline_judge,
                }
                for discipline_judge in self.discipline_judges
                if discipline_judge.id not in scores_judge_ids
            ]
        if len(scores_to_create) > 0:
            Score.insert_many(scores_to_create).execute()
        # Permute heats
        prev_tour = self.get_prev_tour(throw=False)
        if prev_tour is None or prev_tour.finalized or prev_tour.hope_tour:
            self.shuffle_heats(ws_message=None, broadcast=False, preserve_existing=True, prefetched=True)
        else:
            self.clone_heats(prev_tour, ws_message=None, broadcast=False, prefetched=True)

    @staticmethod
    def weighted_shuffle(runs, participants_per_heat):
        # Prepare result
        result = [None for _ in runs]
        free_slots = set(x for x in range(len(result)))
        # Make clubs list
        club_pools = defaultdict(list)
        for run in runs:
            club_pools[run.participant.club_id].append(run)
        clubs_lists = sorted(club_pools.items(), key=lambda x: -len(x[1]))
        for club_id, club_runs in clubs_lists:
            heats_used = defaultdict(lambda: 0)
            for run in club_runs:
                slots_weights = {
                    idx: 1 / (100 ** heats_used[idx // participants_per_heat])
                    for idx in free_slots
                }
                total_weight = sum(slots_weights.values())
                weights_rsq = list((key, value / total_weight) for key, value in slots_weights.items())
                s = 0
                for idx, item in enumerate(weights_rsq):
                    weights_rsq[idx] = (item[0], s,)
                    s += item[1]
                rnd = random.random()
                l, r = 0, len(weights_rsq)
                while l < r - 1:
                    m = (l + r) // 2
                    if weights_rsq[m][1] < rnd:
                        l = m
                    else:
                        r = m
                slot = weights_rsq[l][0]
                heat = slot // participants_per_heat
                heats_used[heat] += 1
                result[slot] = run
                free_slots.remove(slot)
        return result

    def shuffle_heats(self, ws_message, preserve_existing=False, broadcast=True, prefetched=False):
        if not prefetched:
            self.smart_prefetch({
                "runs": {
                    "participant": {}
                },
            })
        heats = defaultdict(list)
        # Assertions
        if self.participants_per_heat <= 0:
            return
        # Adding fake runs to last but one heat
        if self.participants_per_heat >= 3 and len(self.runs) % self.participants_per_heat == 1:
            heats[len(self.runs) // self.participants_per_heat] = \
                [None] * (self.participants_per_heat - (self.participants_per_heat + 1) // 2)
        # Filling with existing heats (only if preserving evisting)
        if preserve_existing:
            for run in self.runs:
                if run.heat > 0:
                    heats[run.heat].append(run.id)
        # Adding new runs to heats
        new_runs = [run for run in self.runs if run.heat <= 0 or not preserve_existing]
        new_runs = self.weighted_shuffle(new_runs, self.participants_per_heat)
        current_filling_heat = 1
        for run in new_runs:
            while len(heats[current_filling_heat]) >= self.participants_per_heat:
                current_filling_heat += 1
            heats[current_filling_heat].append(run.id)
        # Trimming empty heats
        result_heats = []
        current_heat = 1
        while len(heats) > 0:
            heat = [x for x in heats.pop(current_heat, []) if x is not None]
            if len(heat) != 0:
                result_heats.append(heat)
            current_heat += 1
        # Assigning heats
        rev_runs = {run.id: run for run in self.runs}
        for heat, run_ids in enumerate(result_heats, start=1):
            for run_id in run_ids:
                run = rev_runs[run_id]
                if run.heat != heat:
                    run.heat = heat
                    run.save()
        # Broadcasting
        if broadcast:
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
                schema={
                    "runs": {},
                },
            )

    def clone_heats(self, source, ws_message, broadcast=True, prefetched=False):
        if not prefetched:
            self.smart_prefetch({
                "runs": {},
            })
        source.smart_prefetch({
            "runs": {},
        })
        runs_map = {run.participant.id: run.heat for run in source.runs}
        for run in self.runs:
            run.heat = runs_map[run.participant_id]
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
        check_permissions("tour.start", {"tour": self})
        if self.finalized:
            raise ApiError("errors.tour.start_finalized")
        if self.active:
            return
        competition_id = self.discipline.competition_id
        active_tours = list(self.__class__.select().join(Discipline).where(
            (Tour.active == True) &  # NOQA
            (Discipline.competition == competition_id)
        ))
        for tour in active_tours:
            tour.stop(ws_message=ws_message, broadcast=False)
        self.active = True
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_active_tours_update(self.discipline.competition_id)

    def stop(self, ws_message, broadcast=True):
        self.active = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        if broadcast:
            ws_message.add_active_tours_update(self.discipline.competition_id)

    @property
    def discipline_judges(self):
        return list(self.discipline.discipline_judges)

    def discipline_judges_by_id(self):
        return {dj.id: dj for dj in self.discipline_judges}

    def get_prev_tour(self, throw=False):
        prev_tours_list = list(self.prev_tour)
        if prev_tours_list == []:
            if throw:
                raise self.DoesNotExist
            return None
        return prev_tours_list[0]

    def check_prev_tour_finalized(self, strict=True):
        prev_tour = self.get_prev_tour()
        if prev_tour is None:
            return
        if not strict:
            prev_tour_size = prev_tour.get_attr_count("runs")
            if prev_tour_size <= prev_tour.num_advances:
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
        self.check_prev_tour_finalized(False)
        self.create_participant_runs()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "runs": {
                    "participant": {
                        "programs": {},
                        "club": {},
                    },
                    "acrobatics": {},
                    "scores": {},
                }
            }
        )
        ws_message.add_tour_results_update(self.id)

    def confirm_heat(self, discipline_judge, heat, ws_message):
        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        from models.score import Score
        from models.run import Run
        scores = Score.select().join(Run).where(
            (Score.discipline_judge == discipline_judge) &
            (Score.confirmed == False) &  # NOQA
            (Run.heat == heat)
        ).execute()
        ids = [score.id for score in scores]
        Score.update(confirmed=True).where(Score.id << ids).execute()
        for score in scores:
            ws_message.add_model_update(
                model_type=Score,
                model_id=score.id,
            )

    def permute_within_heat(self, run_ids, ws_message):
        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        self.smart_prefetch({
            "runs": {}
        })
        id_to_run = {run.id: run for run in self.runs}
        for idx, run_id in enumerate(run_ids):
            run = id_to_run.get(run_id, None)
            if run is None:
                continue
            run.heat_secondary = idx
            run.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "runs": {},
            }
        )

    def finalize(self, ws_message):
        self.check_prev_tour_finalized()
        if self.active:
            self.stop(ws_message)
        results = self.results
        self.cached_results = results
        self.finalized = True
        self.total_advanced = len([
            None
            for row in results
            if row["advances"]
        ])
        self.save()
        if self.next_tour:
            self.next_tour.init(ws_message)
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={}
        )
        ws_message.add_tour_results_update(self.id)

    def unfinalize(self, ws_message):
        self.check_next_tour_not_finalized()
        self.finalized = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={}
        )
        ws_message.add_tour_results_update(self.id)

    @property
    def scoring_system(self):
        return get_scoring_system(self)

    @classmethod
    def load_models(cls, discipline, objects):
        if discipline.first_tour is not None:
            return  # Skip import
        add_after = None
        for obj in objects:
            model = cls.create_model(discipline, add_after, obj, WsMessage())
            discipline.tours.append(model)
            add_after = model.id

    @classmethod
    def create_model(cls, discipline, add_after, data, ws_message):
        if "scoring_system_name" in data:
            cls.validate_scoring_system_name(discipline, data["scoring_system_name"])
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
        return tour

    @staticmethod
    def validate_scoring_system_name(discipline, scoring_system_name):
        parts = scoring_system_name.split(".")
        if len(parts) != 2 or parts[0] != discipline.competition.rules_set:
            raise ApiError("errors.tour.invalid_scoring_system")

    def update_model(self, new_data, ws_message):
        if self.finalized:
            for key in ["num_advances", "hope_tour", "scoring_system_name"]:
                if key in new_data:
                    raise ApiError("errors.tour.update_finalized")
        if "scoring_system_name" in new_data:
            self.validate_scoring_system_name(self.discipline, new_data["scoring_system_name"])
        self.update_model_base(new_data)
        if "scoring_system_name" in new_data:
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
                schema={
                    "runs": {
                        "scores": {},
                    },
                }
            )
            ws_message.add_tour_results_update(self.id, immediate=True)
        else:
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
            )

    def delete_model(self, ws_message):
        if self.finalized:
            raise ApiError("errors.tour.delete_finalized")
        discipline = self.discipline
        prev_tour = self.get_prev_tour()
        if prev_tour is None:  # This is the first_tour
            discipline.first_tour = self.next_tour
            discipline.save()
        else:
            prev_tour.next_tour = self.next_tour
            prev_tour.save()
        self.delete_instance()
        ws_message.add_model_update(
            model_type=Discipline,
            model_id=discipline.id,
            schema={
                "tours": {},
            }
        )
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=discipline.competition_id,
            schema={
                "plan": {},
            }
        )
        if self.active:
            ws_message.add_active_tours_update(discipline.competition_id)

    @property
    def results(self):
        if self.finalized and self.cached_results is not None:
            return self.cached_results
        ordered_djs = list(self.discipline_judges)
        ss_runs = []
        for run in self.runs:
            scores_index = {s.discipline_judge_id: s for s in run.scores}
            ordered_scores = [scores_index.get(dj.id, None) for dj in ordered_djs]
            ss_runs.append({
                "run_id": run.id,
                "scores": [(s.score_data if s is not None else {}) for s in ordered_scores],
                "scores_ids": [(s.id if s is not None else None) for s in ordered_scores],
                "acro_scores": run.get_acro_scores(),
                "inherited_data": run.inherited_data,
                "status": run.status,
            })
        return self.scoring_system.get_tour_results(
            runs=ss_runs,
            judges_roles=[dj.role for dj in self.discipline_judges],
            num_advances=self.get_actual_num_advances(),
            tour_name=self.name,
        )

    def serialize(self, children={}):
        result = self.serialize_props()
        result["next_tour_id"] = self.next_tour_id
        result = self.serialize_upper_child(result, "discipline", children)
        result = self.serialize_lower_child(
            result, "runs", children,
            lambda x, c: x.serialize(discipline_judges=list(self.discipline_judges), children=c))
        if "results" in children:
            result["results"] = self.results
        return result

    def export(self):
        result = self.serialize_props()
        result.update({
            "id": self.id,
            "results": self.results,
            "runs": [run.export() for run in self.runs],
        })
        return result


tour_proxy.initialize(Tour)
