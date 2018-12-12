from abc import ABCMeta, abstractmethod
from typing import Generator, NamedTuple, Optional, Type

from sqlalchemy.orm import Session

from models.base_model import BaseModel
from models.client import Client
from models.client_auth import ClientAuth
from models.club import Club
from models.competition import Competition
from models.competition_plan_item import CompetitionPlanItem
from models.discipline import Discipline
from models.discipline_judge import DisciplineJudge
from models.judge import Judge
from models.participant import Participant
from models.program import Program
from models.run import Run
from models.run_acrobatic import RunAcrobatic
from models.score import Score
from models.tour import Tour
from mutations import (
    DisciplineResultsMutationRecord,
    ModelMutationRecord,
    MutationsKeeper,
    TourResultsMutationRecord,
)
from prefetching import ModelTreeNode, RecursiveDict


class InitialModelData(NamedTuple):
    model: BaseModel
    results_needed: bool = False

    def with_results(self) -> "InitialModelData":
        return type(self)(self.model, True)


class SubscriptionBase(metaclass=ABCMeta):
    def __init__(self, subscription_id: str) -> None:
        self.subscription_id = subscription_id

    @abstractmethod
    def should_push_model_mutation(self, mutation: "ModelMutationRecord") -> bool:
        pass

    @abstractmethod
    def should_push_tour_results_mutation(
        self, record: "TourResultsMutationRecord"
    ) -> bool:
        pass

    @abstractmethod
    def should_push_discipline_results_mutation(
        self, record: "DisciplineResultsMutationRecord"
    ) -> bool:
        pass

    @abstractmethod
    def get_initial_models(
        self, session: Session
    ) -> Generator[InitialModelData, None, None]:
        pass

    def add_initial_models_to_mk(self, session: Session, mk: MutationsKeeper) -> None:
        for model_data in self.get_initial_models(session):
            model = model_data.model
            mk.submit_model_created(model)
            if model_data.results_needed:
                if isinstance(model, Tour):
                    mk.submit_tour_results_update(model)
                elif isinstance(model, Discipline):
                    mk.submit_discipline_results_update(model)
                else:
                    raise ValueError(
                        f"No results can be fetched for model {type(model).__name__}"
                    )

    def _yield_models(
        self, model: "BaseModel", schema: RecursiveDict
    ) -> Generator[BaseModel, None, None]:
        yield model
        for key, subschema in schema.items():
            for submodel in getattr(model, key):
                yield from self._yield_models(submodel, subschema)

    def _get_initial_general(
        self,
        session: Session,
        model_type: Type[BaseModel],
        model_id: int,
        schema: RecursiveDict,
        prefetch_alt_schema: Optional[RecursiveDict] = None,
    ) -> Generator[InitialModelData, None, None]:
        model_tree = ModelTreeNode.from_dict(model_type, prefetch_alt_schema or schema)
        root_model = (
            session.query(model_type)
            .options(*model_tree.build_prefetcher())
            .get(model_id)
        )
        model_tree.save_to_session(session, root_model)
        for model in self._yield_models(root_model, schema):
            yield InitialModelData(model)


class SubscriptionClient(SubscriptionBase):
    def __init__(self, client_id: int, subscription_id: str) -> None:
        super().__init__(subscription_id)
        self.__client_id = client_id

    def should_push_model_mutation(self, mutation: "ModelMutationRecord") -> bool:
        return mutation.client_id == self.__client_id and mutation.model_type in {
            Client,
            ClientAuth,
        }

    def should_push_tour_results_mutation(
        self, record: "TourResultsMutationRecord"
    ) -> bool:
        return False

    def should_push_discipline_results_mutation(
        self, record: "DisciplineResultsMutationRecord"
    ) -> bool:
        return False

    def get_initial_models(
        self, session: Session
    ) -> Generator[InitialModelData, None, None]:
        yield from self._get_initial_general(
            session, Client, self.__client_id, {"authorizations": {}}
        )


class SubscriptionAllCompetitions(SubscriptionBase):
    def should_push_model_mutation(self, mutation: "ModelMutationRecord") -> bool:
        return mutation.model_type == Competition

    def should_push_tour_results_mutation(
        self, record: "TourResultsMutationRecord"
    ) -> bool:
        return False

    def should_push_discipline_results_mutation(
        self, record: "DisciplineResultsMutationRecord"
    ) -> bool:
        return False

    def get_initial_models(
        self, session: Session
    ) -> Generator[InitialModelData, None, None]:
        yield from map(
            InitialModelData, session.query(Competition).filter_by(deleted=False).all()
        )


class SubscriptionCompetition(SubscriptionBase):
    def __init__(self, competition_id: int, subscription_id: str) -> None:
        super().__init__(subscription_id)
        self.__competition_id = competition_id

    def should_push_model_mutation(self, mutation: "ModelMutationRecord") -> bool:
        return (
            mutation.competition_id == self.__competition_id
            and mutation.model_type
            in {
                Competition,
                Discipline,
                Tour,
                Run,
                Participant,
                Program,
                Discipline,
                Judge,
                DisciplineJudge,
                Club,
                CompetitionPlanItem,
                ClientAuth,
            }
        )

    def should_push_tour_results_mutation(
        self, record: "TourResultsMutationRecord"
    ) -> bool:
        return False

    def should_push_discipline_results_mutation(
        self, record: "DisciplineResultsMutationRecord"
    ) -> bool:
        return record.competition_id == self.__competition_id

    def get_initial_models(
        self, session: Session
    ) -> Generator[InitialModelData, None, None]:
        gen_result = self._get_initial_general(
            session,
            Competition,
            self.__competition_id,
            {
                "disciplines": {
                    "tours": {"runs": {}},
                    "participants": {"programs": {}},
                    "discipline_judges": {},
                },
                "clubs": {},
                "plan": {},
                "judges": {},
                "clients": {},
            },
            {
                "disciplines": {
                    "tours": {"runs": {"scores": {"parts": {}}, "acrobatics": {}}},
                    "participants": {"programs": {}},
                    "discipline_judges": {},
                },
                "clubs": {},
                "plan": {},
                "judges": {},
                "clients": {},
            },
        )
        for model_record in gen_result:
            if isinstance(model_record.model, Discipline):
                yield model_record.with_results()
            else:
                yield model_record


class SubscriptionTour(SubscriptionBase):
    def __init__(self, tour_id: int, subscription_id: str) -> None:
        super().__init__(subscription_id)
        self.__tour_id = tour_id

    def should_push_model_mutation(self, mutation: "ModelMutationRecord") -> bool:
        return mutation.tour_id == self.__tour_id and mutation.model_type in {
            Tour,
            Run,
            Score,
            RunAcrobatic,
        }

    def should_push_tour_results_mutation(
        self, record: "TourResultsMutationRecord"
    ) -> bool:
        return record.tour_id == self.__tour_id

    def should_push_discipline_results_mutation(
        self, record: "DisciplineResultsMutationRecord"
    ) -> bool:
        return False

    def get_initial_models(
        self, session: Session
    ) -> Generator[InitialModelData, None, None]:
        gen_result = self._get_initial_general(
            session,
            Tour,
            self.__tour_id,
            {"runs": {"scores": {}, "acrobatics": {}}},
            {
                "discipline": {
                    "discipline_judges": {"judge": {}},
                    "tours": {"runs": {"scores": {"parts": {}}, "acrobatics": {}}},
                }
            },
        )
        for model_record in gen_result:
            if isinstance(model_record.model, Tour):
                yield model_record.with_results()
            else:
                yield model_record
