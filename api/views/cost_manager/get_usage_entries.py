from rest_framework.response import Response
from rest_framework import status

# Models
from ...view_models import RawUsageAllFieldsAllTime

# Serializers
from ...serializers.usage import RawUsageDataConsumer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ...permissions.permission_decorator import user_has_permissions

# Data analysis tools
import pandas as pd

# helper functions
from ..helper_functions.query_param_getter import get_standart_params

@api_view(["GET"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["rawusageallfieldsalltime"])
def get_usage_entries(request):
  if request.method == "GET":
    q = get_standart_params(request)  # Here: Only data consumer id
    try:
      usage_entries = RawUsageAllFieldsAllTime.objects.filter(q).values()
      data = pd.DataFrame.from_records(usage_entries, index="id")
      data["usage_time"] = data["end_time"] - data["start_time"]
      data = data.filter(["start_time", "end_time", "usage_time"])
      serializer = RawUsageDataConsumer(data.to_dict(orient="records"), many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except RawUsageAllFieldsAllTime.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)