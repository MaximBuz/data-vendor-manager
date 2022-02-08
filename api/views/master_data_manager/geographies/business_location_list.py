from rest_framework.response import Response

# serializers
from ....serializers.business_location import BusinessLocationSerializer, BusinessLocationPostSerializer

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

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["businesslocation"])
def business_location_list(request):

    # get a list of all loactions (with dynamic depth)
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        business_locations = BusinessLocation.objects.all()
        serializer = BusinessLocationSerializer(
            business_locations, many=True, context={'depth': depth})
        return Response(serializer.data)

    # post a new location
    if request.method == "POST":
        serializer = BusinessLocationPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)