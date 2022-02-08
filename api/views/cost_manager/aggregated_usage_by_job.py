from rest_framework.response import Response
from rest_framework import status

# Serializers
from ...serializers.usage import AggregatedUsageByJobSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ...permissions.permission_decorator import user_has_permissions

# helper functions
from ..helper_functions.usage_time_aggregator import get_filtered_aggregated_data

@api_view(["GET"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["rawusageallfieldsalltime"])
def aggregated_usage_by_job(request):
  try:
    # get first filtered and then aggregated data
    aggregated_data = get_filtered_aggregated_data(
        request, "data_consumer_job_title_pk")
  except BaseException as error:
    # Return error if no data can be found
    return Response(status=status.HTTP_200_OK)

  # remove unnecessary columns
  aggregated_data = aggregated_data[[
      "usage_time", "data_consumer_job_title_pk", "data_consumer_job_title"]]

  # serialize data into JSON
  serializer = AggregatedUsageByJobSerializer(
      aggregated_data.to_dict(orient="records"), many=True)

  return Response(serializer.data, status=status.HTTP_200_OK)