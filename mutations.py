import copy
from collections import defaultdict
from enum import Enum
from typing import (
    Any,
    DefaultDict,
    Dict,
    Iterable,
    List,
    NamedTuple,
    Optional,
    Set,
    TYPE_CHECKING,
    Tuple,
    Type,
    TypeVar,
)

from sqlalchemy.orm import Session

from db import db
from exceptions import InternalError
from models.base_model import BaseModel
from models.discipline import Discipline, DisciplineResults
from models.tour import Tour
from prefetching import ModelTreeNode
from scoring_systems.base import TourComputationResult
from utils import timed


if TYPE_CHECKING:
    from subscriptions import SubscriptionBase


# Types


T = TypeVar("T")

ModelDescriptorTuple = Tuple[Type[BaseModel], int]


# Enums


class ModelChangeAction(Enum):
    CREATE = "C"
    UPDATE = "U"
    DELETE = "D"


# Shapes


class ModelMutationRecord(NamedTuple):
    action: ModelChangeAction
    model_type: Type["BaseModel"]
    model_id: int
    competition_id: Optional[int]
    tour_id: Optional[int]
    client_id: Optional[int]

    @classmethod
    def from_model(
        cls, model: BaseModel, action: ModelChangeAction
    ) -> "ModelMutationRecord":
        return cls(
            action,
            type(model),
            model.id,
            getattr(model, "competition_id", None),
            getattr(model, "tour_id", None),
            getattr(model, "client_id", None),
        )

    @classmethod
    def __set_optional_value(cls, old_value: T, new_value: T, field_name: str) -> T:
        if old_value is None or old_value == new_value:
            return new_value
        raise InternalError(
            f"Unable to update value for {field_name} to {new_value} since "
            f"it is already set to {old_value}."
        )

    @classmethod
    def __combine_action(cls, actions: Set[ModelChangeAction]) -> ModelChangeAction:
        if ModelChangeAction.DELETE in actions:
            return ModelChangeAction.DELETE
        if ModelChangeAction.CREATE in actions:
            return ModelChangeAction.CREATE
        return ModelChangeAction.UPDATE

    @classmethod
    def __combine_similar_records(
        cls, records: List["ModelMutationRecord"]
    ) -> "ModelMutationRecord":
        first = records[0]
        all_actions: Set[ModelChangeAction] = set()
        competition_id: Optional[int] = None
        tour_id: Optional[int] = None
        client_id: Optional[int] = None
        for rec in records:
            all_actions.add(rec.action)
            competition_id = cls.__set_optional_value(
                competition_id, rec.competition_id, "competition_id"
            )
            tour_id = cls.__set_optional_value(tour_id, rec.tour_id, "tour_id")
            client_id = cls.__set_optional_value(client_id, rec.client_id, "client_id")
        return cls(
            action=cls.__combine_action(all_actions),
            model_type=first.model_type,
            model_id=first.model_id,
            competition_id=competition_id,
            tour_id=tour_id,
            client_id=client_id,
        )

    @classmethod
    def combine_records(
        cls, records: Iterable["ModelMutationRecord"]
    ) -> List["ModelMutationRecord"]:
        sorted_records: DefaultDict[
            ModelDescriptorTuple, List[ModelMutationRecord]
        ] = defaultdict(list)
        for record in records:
            key = (record.model_type, record.model_id)
            sorted_records[key].append(record)
        return list(map(cls.__combine_similar_records, sorted_records.values()))


class TourResultsMutationRecord(NamedTuple):
    tour_id: int
    discipline_id: int
    competition_id: int

    @classmethod
    def from_model(cls, model: Tour) -> "TourResultsMutationRecord":
        return cls(model.id, model.discipline_id, model.competition_id)

    @property
    def discipline_record(self) -> "DisciplineResultsMutationRecord":
        return DisciplineResultsMutationRecord(self.discipline_id, self.competition_id)


class DisciplineResultsMutationRecord(NamedTuple):
    discipline_id: int
    competition_id: int

    @classmethod
    def from_model(cls, model: Discipline) -> "DisciplineResultsMutationRecord":
        return cls(model.id, model.competition_id)

    @classmethod
    def combine_records(
        cls, records: Iterable["DisciplineResultsMutationRecord"]
    ) -> List["DisciplineResultsMutationRecord"]:
        discipline_id_to_competition_id: Dict[int, int] = {
            record.discipline_id: record.competition_id for record in records
        }
        return list(
            map(
                lambda p: DisciplineResultsMutationRecord(*p),
                discipline_id_to_competition_id.items(),
            )
        )


class FetchedModelMutation(NamedTuple):
    mutation_record: ModelMutationRecord
    model: Optional[BaseModel]

    def serialize(self) -> Any:
        return {
            "action": self.mutation_record.action.value,
            "model_name": self.mutation_record.model_type.__name__,
            "id": self.mutation_record.model_id,
            "data": self.model and self.model.serialize(),
            "competition_id": self.mutation_record.competition_id,
            "tour_id": self.mutation_record.tour_id,
            "client_id": self.mutation_record.client_id,
        }


class FetchedTourResultsMutation(NamedTuple):
    mutation_record: TourResultsMutationRecord
    data: TourComputationResult

    def serialize(self) -> Any:
        return {
            "tour_id": self.mutation_record.tour_id,
            "discipline_id": self.mutation_record.discipline_id,
            "competition_id": self.mutation_record.competition_id,
            "data": self.data.serialize(),
        }


class FetchedDisciplineResultsMutation(NamedTuple):
    mutation_record: DisciplineResultsMutationRecord
    data: DisciplineResults

    def serialize(self) -> Any:
        return {
            "discipline_id": self.mutation_record.discipline_id,
            "competition_id": self.mutation_record.competition_id,
            "data": self.data.serialize(),
        }


# Classes


class MutationsKeeper:
    def __init__(self) -> None:
        self.models_mutations: List[ModelMutationRecord] = []
        self.tour_results_mutations: List[TourResultsMutationRecord] = []
        self.discipline_results_mutations: List[DisciplineResultsMutationRecord] = []

    def submit_model_updated(self, model: "BaseModel") -> None:
        self.models_mutations.append(
            ModelMutationRecord.from_model(model, ModelChangeAction.UPDATE)
        )

    def submit_model_created(self, model: "BaseModel") -> None:
        self.models_mutations.append(
            ModelMutationRecord.from_model(model, ModelChangeAction.CREATE)
        )

    def submit_model_deleted(self, model: "BaseModel") -> None:
        self.models_mutations.append(
            ModelMutationRecord.from_model(model, ModelChangeAction.DELETE)
        )

    def submit_tour_results_update(self, tour: "Tour") -> None:
        self.tour_results_mutations.append(TourResultsMutationRecord.from_model(tour))

    def submit_discipline_results_update(self, discipline: "Discipline") -> None:
        self.discipline_results_mutations.append(
            DisciplineResultsMutationRecord.from_model(discipline)
        )

    def finalize(self) -> "FinalizedMutations":
        return FinalizedMutations(
            models_mutations=ModelMutationRecord.combine_records(self.models_mutations),
            discipline_results_mutations=DisciplineResultsMutationRecord.combine_records(
                (
                    *self.discipline_results_mutations,
                    *(rec.discipline_record for rec in self.tour_results_mutations),
                )
            ),
        )


class FinalizedMutations(NamedTuple):
    models_mutations: List[ModelMutationRecord]
    discipline_results_mutations: List[DisciplineResultsMutationRecord]

    def __bool__(self) -> bool:
        return bool(self.models_mutations) or bool(self.discipline_results_mutations)

    def __prefetch_disciplines_to_session(self, session: Session) -> List[Discipline]:
        model_tree = ModelTreeNode.from_dict(
            Discipline,
            {
                "discipline_judges": {"judge": {}},
                "tours": {"runs": {"acrobatics": {}, "scores": {"parts": {}}}},
            },
        )
        discipline_ids = [
            rec.discipline_id for rec in self.discipline_results_mutations
        ]
        disciplines = (
            session.query(Discipline)
            .filter(Discipline.id.in_(discipline_ids))
            .options(*model_tree.build_prefetcher())
            .all()
        )
        for discipline in disciplines:
            model_tree.save_to_session(session, discipline)

    def __prefetch_models_to_session(
        self, session: Session
    ) -> Tuple["ModelsSet", "ModelsSet"]:
        models_to_fetch = ModelsSet()
        for record in self.models_mutations:
            if record.action != ModelChangeAction.DELETE:
                models_to_fetch[record.model_type].add(record.model_id)
        models_to_fetch.leave_uncached(session).prefetch(session)

    def fetch(
        self, session: Session, *, fetch_results: bool, skip_prefetch: bool = False
    ) -> "FetchedMutations":
        models_mutations: List[FetchedModelMutation] = []
        tour_results_mutations: List[FetchedTourResultsMutation] = []
        discipline_results_mutations: List[FetchedDisciplineResultsMutation] = []
        # Prepare disciplines and tours
        if fetch_results:
            if not skip_prefetch:
                self.__prefetch_disciplines_to_session(session)
            for record in self.discipline_results_mutations:
                discipline = Discipline.get(session, record.discipline_id)
                discipline_results_data, computed_tours = discipline.get_results()
                discipline_results_mutations.append(
                    FetchedDisciplineResultsMutation(
                        mutation_record=record, data=discipline_results_data
                    )
                )
                for tour_id, tour_results_data in computed_tours.items():
                    tour_results_mutations.append(
                        FetchedTourResultsMutation(
                            mutation_record=TourResultsMutationRecord(
                                tour_id=tour_id,
                                discipline_id=record.discipline_id,
                                competition_id=record.competition_id,
                            ),
                            data=tour_results_data,
                        )
                    )
        # Prepare models
        if not skip_prefetch:
            self.__prefetch_models_to_session(session)
        for record in self.models_mutations:
            model = (
                record.model_type.get(session, record.model_id)
                if record.action != ModelChangeAction.DELETE
                else None
            )
            models_mutations.append(
                FetchedModelMutation(mutation_record=record, model=model)
            )
        return FetchedMutations(
            models_mutations, tour_results_mutations, discipline_results_mutations
        )


class FetchedMutations(NamedTuple):
    models_mutations: List[FetchedModelMutation]
    tour_results_mutations: List[FetchedTourResultsMutation]
    discipline_results_mutations: List[FetchedDisciplineResultsMutation]

    def __bool__(self) -> bool:
        return (
            bool(self.models_mutations)
            or bool(self.tour_results_mutations)
            or bool(self.discipline_results_mutations)
        )

    def filter_for_subscriptions(
        self, subscriptions: List["SubscriptionBase"]
    ) -> "FetchedMutations":
        models_mutations = [
            mut
            for mut in self.models_mutations
            if any(
                sub.should_push_model_mutation(mut.mutation_record)
                for sub in subscriptions
            )
        ]
        tour_results_mutations = [
            mut
            for mut in self.tour_results_mutations
            if any(
                sub.should_push_tour_results_mutation(mut.mutation_record)
                for sub in subscriptions
            )
        ]
        discipline_results_mutations = [
            mut
            for mut in self.discipline_results_mutations
            if any(
                sub.should_push_discipline_results_mutation(mut.mutation_record)
                for sub in subscriptions
            )
        ]
        return type(self)(
            models_mutations, tour_results_mutations, discipline_results_mutations
        )

    def serialize(self) -> Any:
        return {
            "models_mutations": [mut.serialize() for mut in self.models_mutations],
            "tour_results_updates": [
                mut.serialize() for mut in self.tour_results_mutations
            ],
            "discipline_results_updates": [
                mut.serialize() for mut in self.discipline_results_mutations
            ],
        }


# Helpers


class ModelsSet(DefaultDict[Type["BaseModel"], Set[int]]):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(set, *args, **kwargs)

    @classmethod
    def merge(cls, *args: "ModelsSet") -> "ModelsSet":
        result: ModelsSet = cls()
        for models_set in args:
            for type_, ids in models_set.items():
                result[type_].update(ids)
        return result

    def prefetch(self, session: Session) -> None:
        for model_type, ids in self.items():
            models = session.query(model_type).filter(model_type.id.in_(ids)).all()
            db.add_to_session_context(session, models)

    def clone(self) -> "ModelsSet":
        return type(self)({type_: copy.copy(value) for type_, value in self.items()})

    def leave_uncached(self, session: Session) -> "ModelsSet":
        result: ModelsSet = self.clone()
        for model in session.identity_map.values():
            result[type(model)].discard(model.id)
        to_delete: List[Type["BaseModel"]] = []
        for type_, ids in result.items():
            if not ids:
                to_delete.append(type_)
        for type_ in to_delete:
            del result[type_]
        return result
