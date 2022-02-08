from rest_framework.response import Response

# serializers
from ....serializers.business_location import BusinessLocationSerializer, BusinessLocationPatchSerializer

# models
from ....models import BusinessLocation

# statuses
from rest_framework import status

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["businesslocation"])
def business_location(request, location_id):

    # get location by id with all related buildings
    if request.method == "GET":
        try:
            location = BusinessLocation.objects.get(pk=location_id)
        except BusinessLocation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        depth = int(request.query_params.get('depth', 0))
        serializer = BusinessLocationSerializer(
            location, context={'depth': depth})
        return Response(serializer.data)

    # update one location by id
    if request.method == "PATCH":
        location = BusinessLocation.objects.get(pk=location_id)
        serializer = BusinessLocationPatchSerializer(
            location, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete one location by id
    if request.method == "DELETE":
        location = BusinessLocation.objects.get(pk=location_id)
        location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    