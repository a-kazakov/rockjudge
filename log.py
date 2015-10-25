import json

from models import ApiLogItem


def log_api(time, latency, queries, method, request, exception, response):
    ApiLogItem.create(
        time=time,
        latency=latency,
        queries=queries,
        method=method,
        request=json.dumps(request, ensure_ascii=False),
        exception=exception,
        response=json.dumps(response, ensure_ascii=False),
    )
