import json

from models import ApiLogItem


def log_api(time, latency, method, request, exception, response):
    ApiLogItem.create(
        time=time,
        latency=latency,
        method=method,
        request=json.dumps(request),
        exception=exception,
        response=json.dumps(response),
    )
