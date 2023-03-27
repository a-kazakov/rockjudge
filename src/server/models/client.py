from __future__ import annotations

import functools
import hashlib
import operator
import random
from typing import (
    Any,
    Dict,
    Iterable,
    NamedTuple,
    Optional,
    Set,
    TYPE_CHECKING,
    Tuple,
    Union,
)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session

from db import SqlAlchemyModel
from exceptions import ApiError, InternalError
from models.base_model import BaseModel
from utils import raise_if_none


if TYPE_CHECKING:
    from api import ApiRequest, ApiMethod
    from models.client_auth import ClientAuth


class ServerDHBundle(NamedTuple):
    client_id: int
    dh_ga: str
    dh_p: str
    dh_g: str

    def serialize(self) -> Any:
        return dict(self._asdict())


class Client(SqlAlchemyModel, BaseModel):
    # DB schema

    __tablename__ = "clients"

    id = Column(Integer, primary_key=True)
    secret = Column(String(2000), nullable=True)
    dh_a_str = Column(String(2000), nullable=True)

    authorizations: Iterable[ClientAuth]

    HIDDEN_FIELDS = {"secret", "dh_a_str"}

    def __str__(self) -> str:
        return "<Client ID={}>".format(self.id)

    # Virtual fields

    @property
    def dh_a(self) -> Optional[int]:
        if self.dh_a_str is None:
            return None
        return int(self.dh_a_str)

    @dh_a.setter
    def dh_a(self, value: Optional[int]) -> None:
        if value is None:
            self.dh_a_str = None
        self.dh_a_str = str(value)

    # Custom model consts/vars

    DH_P = 0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C934063199FFFFFFFFFFFFFFFF
    DH_G = 0x2

    randoms_used: Set[str] = set()

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.id,)

    @property
    def client_id(self) -> int:
        return self.id

    # Permissions

    def check_read_permission(self, request: "ApiRequest") -> bool:
        if self.id == request.client.id:
            return True
        return False

    # Create logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        return {"dh_a": cls.make_random()}

    # Serialization logic
    # (default)

    # Custom model logic

    # - Props

    @property
    def dh_bundle(self) -> ServerDHBundle:
        dh_ga = self.a_pow_b_mod_p(self.DH_G, self.dh_a, self.DH_P)
        return ServerDHBundle(
            client_id=self.id,
            dh_ga=str(dh_ga),
            dh_p=str(self.DH_P),
            dh_g=str(self.DH_G),
        )

    @property
    def verification_string(self) -> str:
        if self.secret is None:
            raise InternalError(
                "Unable to get verification string since there is no secret"
            )
        return hashlib.md5(f"RockJudge|{self.secret}".encode("utf-8")).hexdigest()

    # - Operations

    @classmethod
    def get_and_validate(
        cls,
        session: Session,
        client_id: int,
        method: "ApiMethod",
        str_data: str,
        random: str,
        signature: str,
    ) -> "Client":
        client = raise_if_none(
            session.query(Client).get(client_id),
            ApiError("errors.auth.invalid_signature"),
        )
        correct_sig_src = "{client_id}|{method}|{data}|{random}|{secret}".format(
            client_id=client_id,
            method=method.value,
            data=str_data,
            random=random,
            secret=client.secret,
        )
        correct_sig = (
            hashlib.md5(correct_sig_src.encode("utf-8")).hexdigest().encode("utf-8")
        )
        user_sig = signature.encode("utf-8")
        if (
            # Time-constant comparison
            len(user_sig) != len(correct_sig)
            or functools.reduce(
                operator.or_, (a ^ b for a, b in zip(correct_sig, user_sig))
            )
            != 0
        ):
            raise ApiError("errors.auth.invalid_signature")
        if random in cls.randoms_used:
            print(f"Double used random value {random}")
            raise ApiError("errors.auth.invalid_signature")
        cls.randoms_used.add(random)
        return client

    def finalize_model(self, request: Dict[str, Any]) -> None:
        if self.dh_a is None:
            raise ApiError("errors.auth.already_authenticated")
        dh_gb = int(request["dh_gb"])
        dh_gab = self.a_pow_b_mod_p(dh_gb, int(self.dh_a), self.DH_P)
        self.secret = "{:x}".format(dh_gab)
        self.dh_a = None

    # - Helpers

    @classmethod
    def a_pow_b_mod_p(cls, a: int, b: int, p: int) -> int:
        if b == 0:
            return 1
        if b % 2 == 1:
            return (a * cls.a_pow_b_mod_p(a, b - 1, p)) % p
        t = cls.a_pow_b_mod_p(a, b // 2, p)
        return (t * t) % p

    @staticmethod
    def make_random() -> int:
        return random.randint(2, 10 ** 100)
