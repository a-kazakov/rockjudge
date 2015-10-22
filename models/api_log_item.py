import peewee

from models.base_model import BaseModel


class ApiLogItem(BaseModel):
    class Meta:
        order_by = ["id"]
        indexes = (
            (("method"), False),
            (("data"), False),
        )
    time = peewee.DoubleField()
    latency = peewee.DoubleField()
    method = peewee.CharField()
    request = peewee.TextField(null=True)
    exception = peewee.TextField(null=True)
    response = peewee.TextField(null=True)

    def serialize(self):
        return {
            "time": self.time,
            "latency": self.latency,
            "method": self.method,
            "request": self.request,
            "exception": self.exception,
            "response": self.response,
        }

    @classmethod
    def fetch_all(cls, limit=None, start_time=0):
        query = cls.select().where(cls.time > start_time)
        if limit is not None:
            query = query.limit(limit)
        return [
            item.serialize()
            for item in query
        ]
