import json

from models import ApiLogItem


def log_api(time, latency, queries, method, body, exception, response):
    ApiLogItem.create(
        time=time,
        latency=latency,
        queries=queries,
        method=method,
        request=json.dumps(body, ensure_ascii=False),
        exception=exception,
        response=json.dumps(response, ensure_ascii=False),
    )
