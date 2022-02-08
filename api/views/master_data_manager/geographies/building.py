from rest_framework.response import Response

# serializers
from ....serializers.building import BuildingSerializer

# models
from ....models import Building

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
@user_has_permissions(modelnames = ["building"])
def building(request, building_id):

    # get building by id with all related buildings
    if request.method == "GET":
        try:
            building = Building.objects.get(pk=building_id)
        except Building.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        depth = int(request.query_params.get('depth', 0))
        serializer = BuildingSerializer(
            building, context={'depth': depth})
        return Response(serializer.data)

    # update one building by id
    if request.method == "PATCH":
        building = Building.objects.get(pk=building_id)
        serializer = BuildingSerializer(
            building, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete one building by id
    if request.method == "DELETE":
        building = Building.objects.get(pk=building_id)
        building.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
