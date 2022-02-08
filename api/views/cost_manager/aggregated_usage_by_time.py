from rest_framework.response import Response
from rest_framework import status

# Models
from ...view_models import RawUsageAllFieldsAllTime

# Serializers
from ...serializers.usage import AggregatedUsageByTimeSerializer

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
def aggregated_usage_by_time(request):
  # get standart params from query
  q = get_standart_params(request)

  usage_entries = RawUsageAllFieldsAllTime.objects.filter(q)

  # Return error if no data can be found
  if len(usage_entries) < 1:
    return Response(status=status.HTTP_200_OK)

  # get frequency param from query for correct aggregation
  frequency = request.query_params.get('freq', "m")

  # create pandas dataframe with the entries
  usage_entry_values = usage_entries.values()
  df = pd.DataFrame.from_records(usage_entry_values, index="id")
  df["usage_time"] = df["end_time"] - df["start_time"]

  # aggregate data on different time frequencies
  grouped = df.groupby(pd.Grouper(key="start_time", freq=frequency,))["usage_time"].agg(
      sum=("sum")).sort_values("start_time", ascending=True).reset_index()
  if frequency == "d":
    grouped["start_time"] = pd.DatetimeIndex(grouped["start_time"]).date
  elif frequency == "m":
    grouped["start_time"] = pd.to_datetime(
        grouped["start_time"]).dt.to_period('M')
  elif frequency == "y":
    grouped["start_time"] = pd.DatetimeIndex(grouped["start_time"]).year

  # serialize data into JSON
  serializer = AggregatedUsageByTimeSerializer(grouped.to_dict(orient="records"), many=True)

  return Response(serializer.data, status=status.HTTP_200_OK)