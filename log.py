import json

from models import ApiLogItem


def log_api(time, latency, queries, request, exception, response):
    ApiLogItem.create(
        time=time,
        latency=latency,
        queries=queries,
        method=request.method,
        request=json.dumps(request.body, ensure_ascii=False),
        exception=exception,
        response=json.dumps(response, ensure_ascii=False),
    )
