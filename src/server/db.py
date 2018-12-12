from typing import Optional, List, Type, TYPE_CHECKING, Any

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker

from settings import DB_CONFIG


if TYPE_CHECKING:
    from models.base_model import BaseModel


ModelBase = declarative_base()


class NewDatabase:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self) -> None:
        self._engine: Optional[Engine] = None
        self._sessionmaker: sessionmaker = None
        # self.ModelBase: Type[BaseModel] = declarative_base(cls=BaseModel)

    @property
    def engine(self) -> Engine:
        if self._engine is None:
            self._engine = create_engine(
                "postgres://{user}:{password}@{host}/{dbname}".format(**DB_CONFIG)
            )
        return self._engine

    @property
    def sessionmaker(self) -> sessionmaker:
        if self._sessionmaker is None:
            self._sessionmaker = sessionmaker(bind=self.engine)
        return self._sessionmaker

    def make_session(self) -> Session:
        session = self.sessionmaker()
        setattr(session, "_RJ_context", [])
        return session

    def add_to_session_context(self, session: Session, value: Any) -> None:
        getattr(session, "_RJ_context").append(value)

    def close_session(self, session: Session) -> None:
        delattr(session, "_RJ_context")
        session.close()

    @staticmethod
    def import_all_models() -> List[Type["BaseModel"]]:
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
        from models.score_part import ScorePart
        from models.tour import Tour

        return [
            Client,
            ClientAuth,
            Club,
            Competition,
            CompetitionPlanItem,
            Discipline,
            DisciplineJudge,
            Judge,
            Participant,
            Program,
            Run,
            RunAcrobatic,
            Score,
            ScorePart,
            Tour,
        ]


db = NewDatabase()