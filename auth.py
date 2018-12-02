# from exceptions import ApiError
#
# from models import ClientAuth
#
#
# def check_auth(competition_id, request, allowed_access_levels):
#     if request.remote_ip == "127.0.0.1":  # localhost always pass
#         return
#     try:
#         auth = ClientAuth.select().where(
#             (ClientAuth.client == request.client) &
#             (ClientAuth.competition == competition_id)
#         ).get()
#     except ClientAuth.DoesNotExist:
#         raise ApiError("errors.auth.not_authenticated")
#     if allowed_access_levels == "*":
#         if auth.access_level == "none":
#             raise ApiError("errors.auth.not_authenticated")
#         return
#     if auth.access_level.startswith("judge_") and ("judge_*" in allowed_access_levels):
#         return
#     if auth.access_level not in allowed_access_levels:
#         raise ApiError("errors.auth.not_authenticated")
