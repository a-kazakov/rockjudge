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

#
# class Database:
#     _instance = None
#
#     @classmethod
#     def instance(cls):
#         if cls._instance is None:
#             cls._instance = cls()
#         return cls._instance
#
#     def __init__(self):
#         self._db = peewee_asyncext.PooledPostgresqlExtDatabase(
#             self._db_name,
#             user=DB_CONFIG["user"],
#             password=DB_CONFIG["password"],
#             host=DB_CONFIG["host"],
#         )
#         asyncio.get_event_loop().run_until_complete(self.db.connect_async())
#
#     @property
#     def _db_name(self):
#         return DB_CONFIG["dbname"]
#
#     @property
#     def db(self):
#         return self._db
#
#
# class SqlLoggingHandler(logging.StreamHandler):
#     LOG_QUERIES = False
#     LOG_STACKTRACES = False
#
#     def __init__(self):
#         super().__init__()
#         self.cnt = 0
#
#     def emit(self, record):
#         if self.LOG_QUERIES:
#             record = record.msg[0]
#             record = re.sub(r'SELECT.+?FROM', 'SELECT * FROM', record)
#             record = re.sub(r'(%s, )+%s', '...', record)
#             print(record)
#         if self.LOG_STACKTRACES:
#             print(traceback.print_stack())
#         self.cnt += 1
#
#
# class StatsCounter:
#     def __enter__(self):
#         self.start_time = time.time()
#         self.loghdlr = SqlLoggingHandler()
#         self.logger = logging.getLogger('peewee')
#         self.logger.setLevel(logging.DEBUG)
#         self.logger.addHandler(self.loghdlr)
#         return self
#
#     def __exit__(self, exception_type, exception_value, traceback):
#         self.logger.removeHandler(self.loghdlr)
#
#     @property
#     def time(self):
#         return int(round(1000 * (time.time() - self.start_time)))
#
#     @property
#     def queries(self):
#         return self.loghdlr.cnt
