import itertools
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

from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.competition import Competition
from scoring_systems.base import TourComputationResult


if TYPE_CHECKING:
    from api import ApiRequest
    from models.discipline_judge import DisciplineJudge
    from models.judge import Judge
    from models.participant import Participant
    from models.run import Run
    from models.tour import ComputedTour, Tour
    from mutations import MutationsKeeper


class DisciplineResultsRow(NamedTuple):
    place: Optional[int]
    run: "Run"

    def serialize(self) -> Dict[str, Any]:
        return {"place": self.place, "run_id": self.run.id}


class DisciplineResults(NamedTuple):
    rows: List[DisciplineResultsRow]
    finalized_tours: Set[int]

    def serialize(self) -> Dict[str, Any]:
        return {
            "rows": [row.serialize() for row in self.rows],
            "finalized_tours": list(self.finalized_tours),
        }


class Discipline(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "disciplines"

    __table_args__ = (
        UniqueConstraint("competition_id", "sp", name="discipline_competition_sp_idx"),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    sp = Column(Integer, nullable=False)
    competition_id = Column(
        Integer, ForeignKey("competitions.id", ondelete="RESTRICT"), nullable=False
    )
    external_id = Column(String, nullable=True)

    competition = relationship(Competition, backref="disciplines")

    discipline_judges: Iterable["DisciplineJudge"]
    participants: Iterable["Participant"]
    tours: Iterable["Tour"]

    # Virtual fields

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.sp,)

    @property
    def _tours_inited(self) -> bool:
        try:
            return self.__tours_inited
        except AttributeError:
            return False

    @_tours_inited.setter
    def _tours_inited(self, value: bool) -> None:
        self.__tours_inited = value

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        auth = ClientAuth.get_for_competition(
            session, request.client, int(data["competition_id"])
        )
        if not auth:
            return False
        return auth.access_level == AccessLevel.ADMIN

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic
    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        return {"competition": session.query(Competition).get(data["competition_id"])}

    # Update logic
    # (default)

    # Delete logic

    def before_delete(self) -> None:
        from models.participant import Participant
        from models.tour import Tour

        if self.session.query(Participant).filter_by(discipline_id=self.id).count() > 0:
            raise ApiError("errors.discipline.delete_with_participants")
        if self.session.query(Tour).filter_by(discipline_id=self.id).count() > 0:
            raise ApiError("errors.discipline.delete_with_tours")

    # Serialization logic

    # Custom model logic

    @property
    def tours_sorted(self) -> List["Tour"]:
        tours: List["Tour"] = sorted(self.tours, key=lambda t: t.sorting_key)
        if not self._tours_inited:
            self.init_tours_order(tours)
        return tours

    def init_tours_order(self, tours: Optional[List["Tour"]]) -> None:
        # Initialize prev_tour and next_tour properties for underlying tours
        self._tours_inited = True
        prev_tour: Optional["Tour"] = None
        for next_tour in itertools.chain(tours or self.tours_sorted, [None]):
            if prev_tour is not None:
                prev_tour.next_tour = next_tour
            if next_tour is not None:
                next_tour.prev_tour = prev_tour
            prev_tour = next_tour

    def compute_tours(self, end: Optional[int] = None) -> List["ComputedTour"]:
        result = []
        inherited_data: Any = None
        for tour in self.tours_sorted:
            if tour.id == end:
                break
            tour_result = tour.compute_results(inherited_data)
            inherited_data = tour_result.inherited_data
            result.append(tour_result)
        return result

    # @timed("Get discipline results")
    def get_results(self) -> Tuple[DisciplineResults, Dict[int, TourComputationResult]]:
        from models.run import Run

        rows: List[DisciplineResultsRow] = []
        participants_added: Set[int] = set()
        computed_tours = list(reversed(self.compute_tours()))
        tours = list(reversed(self.tours_sorted))
        tours_results_dict: Dict[int, TourComputationResult] = {}
        for idx, (tour, c_tour) in enumerate(zip(tours, computed_tours)):
            tours_results_dict[tour.id] = c_tour
            skip_place = not tour.finalized or (idx > 0 and tours[idx - 1].hope_tour)
            place_offset = (
                sum(rr.advanced for rr in computed_tours[idx + 1].runs_results.values())
                if idx < len(tours) - 1 and tour.hope_tour
                else 0
            )
            for run_id in c_tour.results_order:
                run = self.session.query(Run).get(run_id)
                c_run = c_tour.runs_results[run_id]
                participant_id = run.participant_id
                if participant_id in participants_added:
                    continue
                row = DisciplineResultsRow(
                    place=(
                        c_run.place + place_offset
                        if not skip_place
                        and not c_run.advanced
                        and c_run.place is not None
                        else None
                    ),
                    run=run,
                )
                participants_added.add(participant_id)
                rows.append(row)
        result = DisciplineResults(
            rows=rows, finalized_tours={t.id for t in tours if t.finalized}
        )
        return result, tours_results_dict

    def set_judges(
        self, new_judges_data: List[Dict[str, Union[int, str]]], mk: "MutationsKeeper"
    ) -> bool:  # True if judges were added
        from models.discipline_judge import DisciplineJudge

        # TODO: typecheck new_judges_data, check judge role with scoring system meta
        new_data = {
            (judge_data["judge_id"], judge_data["role"])
            for judge_data in new_judges_data
        }
        old_data = {
            (discipline_judge.judge_id, discipline_judge.role)
            for discipline_judge in self.discipline_judges
        }
        if new_data == old_data:
            return False
        self.check_no_finalized_tours(
            "errors.discipline.change_judges_with_finalized_tour"
        )
        new_ids = {judge_data["judge_id"] for judge_data in new_judges_data}
        old_ids = {
            discipline_judge.judge_id for discipline_judge in self.discipline_judges
        }
        rev_judges: Dict[int, "Judge"] = {
            judge.id: judge for judge in self.competition.judges
        }
        rev_discipline_judges: Dict[int, "DisciplineJudge"] = {
            discipline_judge.judge_id: discipline_judge
            for discipline_judge in self.discipline_judges
        }
        rev_judges_data: Dict[int, Dict[str, Union[int, str]]] = {
            obj["judge_id"]: obj for obj in new_judges_data
        }
        judges_ids_to_add = new_ids - old_ids
        judges_ids_to_update = new_ids.intersection(old_ids)
        judges_ids_to_delete = old_ids - new_ids
        for judge_id in judges_ids_to_add:
            DisciplineJudge.create(
                self.session,
                {
                    "discipline": self,
                    "judge": rev_judges[judge_id],
                    "role": rev_judges_data[judge_id]["role"],
                },
                mk,
                unsafe=True,
            )
        for judge_id in judges_ids_to_update:
            rev_discipline_judges[judge_id].update(
                {"role": rev_judges_data[judge_id]["role"]}, mk
            )
        for judge_id in judges_ids_to_delete:
            rev_discipline_judges[judge_id].delete(mk)
        return bool(judges_ids_to_add)

    def check_no_finalized_tours(self, error_message: str) -> None:
        from models.tour import Tour

        if (
            self.session.query(Tour).filter_by(discipline=self, finalized=True).count()
            > 0
        ):
            raise ApiError(error_message)

    def normalize_tours_sps(self) -> None:
        for idx, tour in enumerate(self.tours_sorted):
            tour.sp = idx * 2 ** 10

    @classmethod
    def load_models(
        cls,
        competition: Competition,
        objects: List[Dict[str, Any]],
        items: Dict[str, Any],
        mk: "MutationsKeeper",
    ) -> None:
        from models.discipline_judge import DisciplineJudge
        from models.participant import Participant
        from models.tour import Tour

        for model, created, raw_data in cls.load_models_base(
            objects, competition.session, mk, competition_id=competition.id
        ):
            if "participants" in raw_data and items["participants"]:
                Participant.load_models(model, raw_data["participants"], mk)
            if "discipline_judges" in raw_data and items["discipline_judges"]:
                DisciplineJudge.load_models(model, raw_data["discipline_judges"], mk)
            if "tours" in raw_data and items["tours"]:
                Tour.load_models(model, raw_data["tours"], mk)

    # RW_PROPS = ["name", "sp", "external_id"]
    #
    # PF_CHILDREN = {
    #     "competition": None,
    #     "discipline_judges": None,
    #     "participants": None,
    #     "tours": {
    #         "raw_tours": None,
    #     },
    # }
    #
    # pf_tours = None
    #
    # def get_back_ref(self, field):
    #     if field == "tours":
    #         return "discipline"
    #     return None
    #
    # @property
    # def tours(self):
    #     if self.pf_tours is not None:
    #         return self.pf_tours
    #     tours = list(self.raw_tours)
    #     rev_tours = {
    #         tour.id: tour
    #         for tour in tours
    #     }
    #     current_tour_id = self.first_tour_id
    #     result = []
    #     while current_tour_id is not None:
    #         current_tour = rev_tours[current_tour_id]
    #         result.append(current_tour)
    #         current_tour_id = current_tour.next_tour_id
    #     self.pf_tours = result
    #     return result
    #
    #

    # @property
    # def results(self):
    #     from models import Run
    #     result = []
    #     participants_added = set()
    #     tours = list(reversed(self.tours))
    #     all_runs = Run.select().where(Run.tour << tours).execute()
    #     runs_by_id = {run.id: run for run in all_runs}
    #     for idx, tour in enumerate(tours):
    #         skip_place = not tour.finalized or (idx > 0 and tours[idx - 1].hope_tour)
    #         tour_results = tour.results
    #         place_offset = tours[idx + 1].total_advanced if idx < len(tours) - 1 and tour.hope_tour else 0
    #         for row in tour_results:
    #             p_id = runs_by_id[row["run_id"]].participant_id
    #             if p_id in participants_added:
    #                 continue
    #             row = {
    #                 "place": (row["place"] + place_offset
    #                           if not skip_place and not row["advances"] and row["place"] is not None
    #                           else None),
    #                 "run_id": row["run_id"],
    #             }
    #             participants_added.add(p_id)
    #             result.append(row)
    #     return result
    #
    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_upper_child(result, "competition", children)
    #     result = self.serialize_lower_child(result, "discipline_judges", children)
    #     result = self.serialize_lower_child(result, "tours", children)
    #     result = self.serialize_lower_child(result, "participants", children)
    #     if "results" in children:
    #         result["results"] = self.results
    #     return result
    #
    # def export(self):
    #     result = self.serialize_props()
    #     result.update({
    #         "id": self.id,
    #         "results": self.results,
    #         "tours": [tour.export() for tour in self.tours],
    #         "discipline_judges": [dj.export() for dj in self.discipline_judges],
    #         "participants": [
    #             participant.export()
    #             for participant in self.participants
    #         ],
    #     })
    #     return result
