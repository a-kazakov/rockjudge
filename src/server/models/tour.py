import itertools
import random
from collections import defaultdict
from typing import (
    Any,
    Dict,
    Iterable,
    List,
    NamedTuple,
    Optional,
    Set,
    TYPE_CHECKING,
    Tuple,
    Union,
)

from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
    asc,
    desc,
)
from sqlalchemy.orm import Session, joinedload, relationship

from db import ModelBase
from enums import AccessLevel, RunStatus
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.discipline import Discipline
from protection.features_restriction import check_permissions
from scoring_systems import get_scoring_system
from scoring_systems.base import (
    BaseScoringSystem,
    JudgeId,
    JudgeResult,
    JudgeRole,
    RunId,
    RunResult,
    ScoreId,
    ScoreResult,
    TourComputationRequest,
    TourComputationResult,
    TourId,
)
from utils import raise_if_none


if TYPE_CHECKING:
    from api import ApiRequest
    from models.competition_plan_item import CompetitionPlanItem
    from models.run import Run
    from models.discipline_judge import DisciplineJudge
    from mutations import MutationsKeeper


class SpCollisionError(Exception):
    pass


class ComputedTour(NamedTuple):
    computation_result: TourComputationResult
    finalized: bool
    scoring_system_name: str
    hope_tour: bool

    @property
    def extra_data(self) -> Dict[str, Any]:
        return self.computation_result.extra_data

    @property
    def inherited_data(self) -> Any:
        return self.computation_result.inherited_data

    @property
    def results_order(self) -> List[RunId]:
        return self.computation_result.results_order

    @property
    def runs_results(self) -> Dict[RunId, RunResult]:
        return self.computation_result.runs_results

    @property
    def scores_results(self) -> Dict[ScoreId, ScoreResult]:
        return self.computation_result.scores_results

    @property
    def judges_results(self) -> Dict[JudgeId, JudgeResult]:
        return self.computation_result.judges_results

    @classmethod
    def create(
        cls, tour: "Tour", computation_result: TourComputationResult
    ) -> "ComputedTour":
        return cls(
            computation_result, tour.finalized, tour.scoring_system_name, tour.hope_tour
        )

    def serialize(self) -> Dict[str, Any]:
        return {
            "finaized": self.finalized,
            "scoring_system_name": self.scoring_system_name,
            "hope_tour": self.hope_tour,
            **self.computation_result.serialize(),
        }


class Tour(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "tours"

    __table_args__ = (
        UniqueConstraint("discipline_id", "sp", name="discipline_sp_idx"),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String(1000), nullable=False)
    discipline_id = Column(
        Integer, ForeignKey("disciplines.id", ondelete="RESTRICT"), nullable=False
    )
    num_advances = Column(Integer, nullable=False)
    participants_per_heat = Column(Integer, nullable=False)
    default_program = Column(String, default="", nullable=False)
    finalized = Column(Boolean, default=False, nullable=False)
    active = Column(Boolean, default=False, nullable=False)
    hope_tour = Column(Boolean, default=False, nullable=False)
    scoring_system_name = Column(String(100), nullable=False)
    sp = Column(Integer, nullable=False, index=True)

    discipline = relationship(Discipline, backref="tours")

    plan_items: Iterable["CompetitionPlanItem"]
    runs: Iterable["Run"]

    HIDDEN_FIELDS = {"sp"}

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.discipline.competition_id

    @property
    def tour_id(self) -> int:
        return self.id

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.sp, self.id)

    def validate(self) -> None:
        if self.participants_per_heat < 0:
            raise ValueError("Participants per heat can't be negative")
        if self.num_advances < 0:
            raise ValueError("Num advances can't be negative")
        # TODO: validate scoring system

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        competition_id = (
            session.query(Discipline).get(data["discipline_id"]).competition_id
        )
        auth = ClientAuth.get_for_competition(session, request.client, competition_id)
        return auth.access_level == AccessLevel.ADMIN

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        auth = self.get_auth(request.client)
        if auth.access_level in (AccessLevel.ADMIN, AccessLevel.ANY_JUDGE):
            return True
        if auth.access_level == AccessLevel.JUDGE:
            dj = self.session.query(DisciplineJudge).fliter_by(
                judge_id=auth.judge_id, discipline_id=self.discipline_id
            )
            return self.scoring_system.get_judge_role_permissions(
                dj.role
            ).can_update_tour
        return False

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        data.pop("active", None)
        if unsafe:
            return {}
        discipline: Discipline = session.query(Discipline).get(
            data.pop("discipline_id")
        )
        next_tour_id = data.pop("add_after")
        if next_tour_id is None:
            prev_tour: Optional[Tour] = None
            next_tour: Optional[Tour] = (
                session.query(Tour)
                .filter_by(discipline=discipline)
                .order_by(asc(Tour.sp))
                .first()
            )
        else:
            prev_tour = session.query(Tour).get(next_tour_id)
            if prev_tour.discipline_id != discipline.id:
                raise ApiError("errors.tour.invalid_add_after_id")
            next_tour = (
                session.query(Tour)
                .filter((Tour.sp > prev_tour.sp) & (Tour.discipline == discipline))
                .order_by(asc(Tour.sp))
                .first()
            )
        if next_tour is not None and next_tour.finalized:
            raise ApiError("errors.tour.add_before_finalized")
        if next_tour is None:
            if prev_tour is None:
                sp = 0
            else:
                sp = prev_tour.sp + 2 ** 10
        else:
            if prev_tour is None:
                sp = next_tour.sp - 2 ** 10
            else:
                sp = (prev_tour.sp + next_tour.sp) // 2
                if sp == prev_tour.sp:
                    discipline.normalize_tours_sps()
                    sp = (prev_tour.sp + next_tour.sp) // 2
        return {"discipline": discipline, "sp": sp}

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)
        for tour in self.discipline.tours:
            if tour.id != self.id:
                mk.submit_model_updated(tour)
        mk.submit_discipline_results_update(self.discipline)

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        if not unsafe:
            data.pop("active", None)
        if self.finalized:
            data.pop("scoring_system_name", None)
            data.pop("hope_tour", None)
            data.pop("num_advances", None)
        return {}

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
        mk.submit_model_updated(self)
        if {"scoring_system_name", "hope_tour", "num_advances"} & set(data.keys()):
            mk.submit_tour_results_update(self)
        if "scoring_system_name" in data:
            for run in self.runs:
                for score in run.scores:
                    mk.submit_model_updated(score)

    # Delete logic

    def submit_delete_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_deleted(self)
        for plan_item in self.plan_items:
            mk.submit_model_deleted(plan_item)

    # Serialization logic

    # Custom model logic

    @property
    def runs_sorted(self) -> List["Run"]:
        return sorted(self.runs, key=lambda r: r.sorting_key)

    @property
    def scoring_system(self) -> BaseScoringSystem:
        try:
            return self.__scoring_system
        except AttributeError:
            self.__scoring_system = get_scoring_system(self.scoring_system_name)
            return self.__scoring_system

    def make_scoring_system_request(
        self, inherited_data: Any
    ) -> TourComputationRequest:
        return TourComputationRequest(
            tour_id=TourId(self.id),
            judge_roles={
                JudgeId(dj.id): JudgeRole(dj.role)
                for dj in self.discipline.discipline_judges
            },
            num_advances=self.num_advances,
            hope_tour=self.hope_tour,
            runs=[run.make_scoring_system_request() for run in self.runs_sorted],
            inherited_data=inherited_data,
        )

    def compute_results(self, inherited_data: Any) -> ComputedTour:
        request = self.make_scoring_system_request(inherited_data)
        result = self.scoring_system.compute_tour(request)
        return ComputedTour.create(self, result)

    @property
    def prev_tour(self) -> Optional["Tour"]:
        try:
            return self.__prev_tour
        except AttributeError:
            self.__prev_tour = (
                self.session.query(Tour)
                .filter(
                    (Tour.discipline_id == self.discipline_id) & (Tour.sp < self.sp)
                )
                .order_by(desc(Tour.sp))
                .first()
            )
            if self.__prev_tour is not None:
                self.__prev_tour.next_tour = self
            return self.__prev_tour

    @prev_tour.setter
    def prev_tour(self, prev_tour: Optional["Tour"]) -> None:
        self.__prev_tour = prev_tour

    @property
    def next_tour(self) -> Optional["Tour"]:
        try:
            return self.__next_tour
        except AttributeError:
            self.__next_tour = (
                self.session.query(Tour)
                .filter(
                    (Tour.discipline_id == self.discipline_id) & (Tour.sp > self.sp)
                )
                .order_by(asc(Tour.sp))
                .first()
            )
            if self.__next_tour is not None:
                self.__next_tour.prev_tour = self
            return self.__next_tour

    @next_tour.setter
    def next_tour(self, prev_tour: Optional["Tour"]) -> None:
        self.__next_tour = prev_tour

    def finalize(self, mk: "MutationsKeeper") -> None:
        if self.prev_tour and not self.prev_tour.finalized:
            raise ApiError("errors.tour.prev_not_finailzed")
        self.finalized = True
        self.active = False
        if self.next_tour is not None:
            self.next_tour.init(mk)
        mk.submit_model_updated(self)
        mk.submit_discipline_results_update(self.discipline)

    def unfinalize(self, mk):
        if self.next_tour is not None and self.next_tour.finalized:
            raise ApiError("errors.tour.next_is_finailzed")
        self.update({"finalized": False}, mk, unsafe=True)
        mk.submit_discipline_results_update(self.discipline)

    def init(self, mk: "MutationsKeeper") -> None:
        if self.finalized:
            raise ApiError("error.tour.init_finalized")
        if self.prev_tour is not None and not self.prev_tour.finalized:
            if len(list(self.prev_tour.runs)) > self.prev_tour.num_advances:
                raise ApiError("errors.tour.prev_not_finailzed")
        self.create_runs(mk)
        if self.__is_participants_same_as_prev():
            self.clone_heats(mk)
        else:
            self.shuffle_heats(mk, preserve_existing=True)

    def __is_participants_same_as_prev(self) -> bool:
        if not self.prev_tour:
            return False
        prev_participants = {run.participant_id for run in self.prev_tour.runs}
        current_participants = {run.participant_id for run in self.runs}
        return prev_participants == current_participants

    def get_partictpant_ids(self) -> List[int]:
        from models.run import Run

        computed_tours = self.discipline.compute_tours(end=self.id)
        if not computed_tours:
            return [participant.id for participant in self.discipline.participants]
        if self.hope_tour:
            pre_result = [
                Run.get(self.session, run_id)
                for run_id, run_result in computed_tours[-1].runs_results.items()
                if not run_result.advanced
            ]
        else:
            run_ids: List[int] = []
            for tour, comp_tour in reversed(
                list(zip(self.discipline.tours_sorted, computed_tours))
            ):
                for run_id, run_result in comp_tour.runs_results.items():
                    if run_result.advanced:
                        run_ids.append(run_id)
                if not tour.hope_tour:
                    break
            pre_result = [Run.get(self.session, run_id) for run_id in run_ids]
        return [run.participant_id for run in pre_result if run.status != RunStatus.DQ]

    def create_runs(self, mk: "MutationsKeeper") -> None:
        from models.run import Run

        participants_ids = set(self.get_partictpant_ids())
        for run in self.runs:
            if run.participant_id not in participants_ids:
                run.delete(mk)
            participants_ids.discard(run.participant_id)
            run.create_scores(mk)
            run.load_default_acrobatics(mk)
        for participant_id in participants_ids:
            run = Run.create(
                self.session,
                {"participant_id": participant_id, "tour": self},
                mk,
                unsafe=True,
            )
            run.load_default_acrobatics(mk)
        mk.submit_tour_results_update(self)

    def clone_heats(self, mk: "MutationsKeeper") -> None:
        runs_map = {
            run.participant_id: (run.heat, run.heat_secondary)
            for run in self.prev_tour.runs
        }
        for run in self.runs:
            heat, heat2 = runs_map[run.participant_id]
            run.update({"heat": heat, "heat_secondary": heat2}, mk, unsafe=True)

    def normalize_heats(self, mk: "MutationsKeeper") -> None:
        heats_found = sorted({run.heat for run in self.runs})
        if not heats_found:
            return
        first_heat = min(heats_found[0], 1)
        heats_next = list(range(first_heat, first_heat + len(heats_found)))
        heats_map: Dict[int, int] = dict(zip(heats_found, heats_next))
        for run in self.runs:
            upd_heat = heats_map[run.heat]
            if upd_heat == run.heat:
                continue
            run.update({"heat": upd_heat}, mk)

    def shuffle_heats(self, mk: "MutationsKeeper", *, preserve_existing: bool) -> None:
        if self.finalized:
            raise ApiError("error.tour.shuffle_finalized")
        if self.participants_per_heat <= 0:
            return
        if preserve_existing:
            self.normalize_heats(mk)
            first_heat = max(itertools.chain([0], (run.heat for run in self.runs))) + 1
            runs = [run for run in self.runs if run.heat <= 0]
        else:
            first_heat = 1
            runs = self.runs
        shuffled_runs = self.weighted_shuffle(runs, self.participants_per_heat)
        for idx, run in enumerate(shuffled_runs, start=0):
            run.update(
                {"heat": first_heat + idx // self.participants_per_heat},
                mk,
                unsafe=True,
            )

    @staticmethod
    def weighted_shuffle(runs: List["Run"], participants_per_heat: int) -> List["Run"]:
        # I have no idea how, but it works. Was drunk when writing this.
        # Prepare result
        result: List[Optional["Run"]] = [None for _ in runs]
        free_slots: Set[int] = set(x for x in range(len(result)))
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
                weights_rsq = list(
                    (key, value / total_weight) for key, value in slots_weights.items()
                )
                s = 0
                for idx, item in enumerate(weights_rsq):
                    weights_rsq[idx] = (item[0], s)
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
        return [raise_if_none(run) for run in result]

    def start(self, mk: "MutationsKeeper") -> None:
        check_permissions("tour.start", {"tour": self})
        if self.finalized:
            raise ApiError("errors.tour.start_finalized")
        if self.active:
            return
        active_tours: List[Tour] = (
            self.session.query(Tour)
            .filter_by(active=True)
            .join(Discipline)
            .filter_by(competition_id=self.competition_id)
            .options(
                joinedload(Tour.discipline).subqueryload(Discipline.discipline_judges)
            )
            .all()
        )
        next_discipline_judges = self.discipline.discipline_judges
        next_judge_ids = {dj.judge_id for dj in next_discipline_judges}
        for tour in active_tours:
            active_judge_ids = {dj.judge_id for dj in tour.discipline.discipline_judges}
            if active_judge_ids.intersection(next_judge_ids):
                tour.stop(mk)
        self.update({"active": True}, mk, unsafe=True)

    def stop(self, mk: "MutationsKeeper") -> None:
        self.update({"active": False}, mk, unsafe=True)

    def confirm_heat(
        self, discipline_judge: "DisciplineJudge", heat: int, mk: "MutationsKeeper"
    ) -> None:
        from models.run import Run
        from models.score import Score

        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        scores = (
            self.session.query(Score)
            .filter_by(discipline_judge=discipline_judge, confirmed=False)
            .join(Run)
            .filter_by(heat=heat, tour=self)
            .all()
        )
        for score in scores:
            score.update({"confirmed": True}, mk)

    def set_judge_scores_confirmation(
        self,
        discipline_judge: "DisciplineJudge",
        new_confirmed: bool,
        mk: "MutationsKeeper",
        synchronize_session: Union[bool, str] = False,
    ):
        from models.run import Run
        from models.score import Score

        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        scores = (
            self.session.query(Score)
            .filter_by(discipline_judge=discipline_judge, confirmed=not new_confirmed)
            .join(Run)
            .filter_by(tour=self)
            .all()
        )
        scores_ids: List[int] = []
        for score in scores:
            mk.submit_model_updated(score)
            scores_ids.append(score.id)
        (
            self.session.query(Score)
            .filter(Score.id.in_(scores_ids))
            .update(
                {"confirmed": new_confirmed}, synchronize_session=synchronize_session
            )
        )

    def reset_judge_scores(
        self,
        discipline_judge: "DisciplineJudge",
        mk: "MutationsKeeper",
        synchronize_session: Union[bool, str] = False,
    ) -> None:
        from models.run import Run
        from models.score import Score
        from models.score_part import ScorePart

        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        scores = (
            self.session.query(Score)
            .filter_by(discipline_judge=discipline_judge)
            .join(Run)
            .filter_by(tour=self)
            .all()
        )
        scores_ids: List[int] = []
        for score in scores:
            mk.submit_model_updated(score)
            scores_ids.append(score.id)
        (
            self.session.query(Score)
            .filter(Score.id.in_(scores_ids))
            .update({"confirmed": False}, synchronize_session=synchronize_session)
        )
        (
            self.session.query(ScorePart)
            .filter(ScorePart.score_id.in_(scores_ids))
            .delete(synchronize_session=synchronize_session)
        )
        mk.submit_tour_results_update(self)

    def permute_within_heat(self, run_ids: List[int], mk: "MutationsKeeper") -> None:
        if self.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        id_to_run = {run.id: run for run in self.runs}
        for idx, run_id in enumerate(run_ids):
            run = id_to_run.get(run_id, None)
            if run is None:
                continue
            run.update({"heat_secondary": idx}, mk, unsafe=True)

    @classmethod
    def load_models(
        cls,
        discipline: Discipline,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ) -> None:
        if discipline.tours:
            return  # Skip import
        for idx, obj in enumerate(objects):
            cls.create(
                discipline.session,
                {
                    "discipline": discipline,
                    "sp": idx * 2 ** 10,
                    **cls.filter_non_managable_fields(obj),
                },
                mk,
                unsafe=True,
            )
