import json
from collections import defaultdict
from typing import List, NamedTuple, Optional, Union, Dict, Any, DefaultDict, Type, Tuple, TypeVar

from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Session
from typeguard import check_type

from models.base_model import BaseModel
from models.club import Club
from models.competition import Competition
from models.discipline import Discipline
from models.judge import Judge
from mutations import MutationsKeeper


TBaseModel = TypeVar("TBaseModel", bound="BaseModel")


def general_import(
    model_type: Type[TBaseModel],
    raw_data: Dict[str, Any],
    mapping: "ExistingMapping",
    mk: MutationsKeeper,
    session: Session,
    **params: Any,
) -> TBaseModel:
    external_id = raw_data["external_id"]
    model = mapping.get(model_type, external_id=external_id, **params)
    if model is None:
        model = model_type.create(
            session,
            {
                **params,
                **raw_data,
            },
            mk,
            unsafe=True,
        )
        mapping.add(model)
    else:
        model.update(
            raw_data,
            mk,
            unsafe=True,
        )
    return model


class ClubImportBundle(NamedTuple):
    city: str
    external_id: str
    name: str

    def import_to(
        self,
        competition: Competition,
        mapping: "ExistingMapping",
        mk: MutationsKeeper,
    ) -> None:
        general_import(
            Club,
            self._asdict(),
            mapping,
            mk,
            competition.session,
            competition_id=competition.id,
        )


class DisciplineJudgeImportBundle(NamedTuple):
    judge: str
    role: str


class ProbramAcrobaticImportBundle(object):
    description: str
    score: Union[int, float]


class ProgramImportBundle(NamedTuple):
    acrobatics: List[ProbramAcrobaticImportBundle]
    default_for: str
    external_id: str
    name: str


class SportsmanImportBundle(NamedTuple):
    first_name: str
    last_name: str
    year_of_birth: int
    gender: str
    substitute: bool


class ParticipantImportBundle(NamedTuple):
    club: str
    coaches: str
    external_id: str
    formation_name: str
    number: int
    programs: List[ProgramImportBundle]
    sportsmen: List[SportsmanImportBundle]


class TourImportBundle(NamedTuple):
    default_program: str
    hope_tour: bool
    name: str
    num_advances: int
    participants_per_heat: int
    scoring_system_name: str


class DisciplineImportBundle(NamedTuple):
    discipline_judges: List[DisciplineJudgeImportBundle]
    participants: List[ParticipantImportBundle]
    tours: List[TourImportBundle]
    name: str
    sp: int
    external_id: str

    def import_to(
        self,
        competition: Competition,
        mapping: "ExistingMapping",
        mk: MutationsKeeper,
    ) -> None:
        general_import(
            Discipline,
            {
                "name": self.name,
                "sp": self.sp,
                "external_id": self.external_id,
            },
            mapping,
            mk,
            competition.session,
            competition_id=competition.id,
        )


class JudgeImportBundle(NamedTuple):
    category: str
    external_id: str
    name: str
    number: str
    origin: str
    role_description: str
    sp: int

    def import_to(
        self,
        competition: Competition,
        mapping: "ExistingMapping",
        mk: MutationsKeeper,
    ) -> None:
        general_import(
            Judge,
            self._asdict(),
            mapping,
            mk,
            competition.session,
            competition_id=competition.id,
        )


class CompetitionPlanImportBundle(NamedTuple):
    discipline_external_id: Optional[str]
    estimated_beginning: str
    estimated_duration: str
    sp: int
    verbose_name: str

    def import_to(
        self,
        competition: Competition,
        mapping: "ExistingMapping",
        mk: MutationsKeeper,
    ) -> None:
        general_import(
            Judge,
            self._asdict(),
            mapping,
            mk,
            competition.session,
            competition_id=competition.id,
        )


class CompetitionImportBundle(NamedTuple):
    clubs: List[ClubImportBundle]
    disciplines: List[DisciplineImportBundle]
    judges: List[JudgeImportBundle]
    plan: List[CompetitionPlanImportBundle]

    @classmethod
    def create(cls, raw_data: Dict[str, Any]) -> "CompetitionImportBundle":
        return cls(
            clubs=list(map(ClubImportBundle, raw_data["clubs"])),
            disciplines=list(map(DisciplineImportBundle, raw_data["disciplines"])),
            judges=list(map(JudgeImportBundle, raw_data["judges"])),
            plan=list(map(CompetitionPlanImportBundle, raw_data["plan"])),
        )

    def import_to(self, competition: Competition, mk: MutationsKeeper) -> None:
        mapping = ExistingMapping(competition)
        for club_bundle in self.clubs:
            club_bundle.import_to(competition, mapping, mk)



class ExistingMapping:
    def __init__(self, competition: Competition) -> None:
        self.mapping: DefaultDict[Type[BaseModel], Dict[str, BaseModel]] = defaultdict(dict)
        for club in competition.clubs:
            self.add(club)
        for discipline in competition.disciplines:
            self.add(discipline)
            for discipline_judge in discipline.discipline_judges:
                self.add(discipline_judge)
            for participant in discipline.participants:
                self.add(participant)
                for program in participant.programs:
                    self.add(program)
        for judge in competition.judges:
            self.add(judge)
        for plan_item in competition.plan:
            self.add(plan_item)

    @staticmethod
    def __get_key_cols(model_type: Type[BaseModel]) -> Optional[Tuple[str, ...]]:
        for arg in getattr(model_type, "__table_args__", []):
            if not isinstance(arg, UniqueConstraint):
                continue
            keys = arg.columns.keys()
            if "external_id" not in keys:
                continue
            return keys

    @staticmethod
    def __get_dict_key(args: Dict[str, Any]) -> str:
        return json.dumps(args, sort_keys=True)

    @classmethod
    def __get_model_key(cls, model: BaseModel) -> Optional[str]:
        cols = cls.__get_key_cols(type(model))
        if cols is None:
            return None
        args = {
            key: getattr(model, key)
            for key in cols
        }
        return cls.__get_dict_key(args)

    def add(self, model: BaseModel) -> None:
        key = self.__get_model_key(model)
        if key is None:
            return
        self.mapping[type(model)][key] = model

    def get(self, model_type: Type[BaseModel], **params: Any) -> Optional[BaseModel]:
        expected_params = self.__get_key_cols(model_type)
        if set(expected_params) != set(params.keys()):
            expected_str = ", ".join(sorted(expected_params))
            got_str = ", ".join(sorted(params.keys()))
            raise RuntimeError(
                f"Unexpected params for getting model {model_type.__name__}. "
                f"Expected {expected_str}; got {got_str}."
            )
        key = self.__get_dict_key(params)
        return self.mapping[model_type].get(key, None)
