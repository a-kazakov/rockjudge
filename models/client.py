import hashlib
import peewee
import random

from exceptions import ApiError
from models.base_model import BaseModel


class Client(BaseModel):
    DH_P = 0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C934063199FFFFFFFFFFFFFFFF
    DH_G = 0x2

    secret = peewee.CharField(max_length=2000, null=True)
    dh_a = peewee.CharField(max_length=2000, null=True)

    @classmethod
    def a_pow_b_mod_p(cls, a, b, p):
        if b == 0:
            return 1
        if b % 2 == 1:
            return (a * cls.a_pow_b_mod_p(a, b - 1, p)) % p
        t = cls.a_pow_b_mod_p(a, b // 2, p)
        return (t * t) % p

    @staticmethod
    def make_random():
        return random.randint(2, 10**100)

    @classmethod
    def create_model(cls):
        model = cls.create(dh_a=cls.make_random())
        dh_ga = cls.a_pow_b_mod_p(cls.DH_G, model.dh_a, cls.DH_P)
        return {
            "client_id": model.id,
            "dh_ga": str(dh_ga),
            "dh_p": str(cls.DH_P),
            "dh_g": str(cls.DH_G),
        }

    @classmethod
    def get_and_validate(cls, client_id, method, str_data, random, signature):
        try:
            client = Client.get(id=client_id)
        except cls.DoesNotExist:
            raise ApiError("errors.auth.invalid_signature")
        correct_sig_src = "{client_id}|{method}|{data}|{random}|{secret}".format(
            client_id=client_id,
            method=method,
            data=str_data,
            random=random,
            secret=client.secret,
        )
        correct_sig = hashlib.md5(correct_sig_src.encode("utf-8")).hexdigest()
        if correct_sig != signature:
            raise ApiError("errors.auth.invalid_signature")
        return client

    def finilaze_model(self, request):
        if self.dh_a is None:
            raise ApiError("errors.auth.already_authenticated")
        dh_gb = int(request["dh_gb"])
        dh_gab = self.a_pow_b_mod_p(dh_gb, int(self.dh_a), self.DH_P)
        self.secret = "{:x}".format(dh_gab)
        self.dh_a = None
        self.save()
        return {
            "verification_string": hashlib.md5("RockJudge|{}".format(self.secret).encode()).hexdigest(),
        }
