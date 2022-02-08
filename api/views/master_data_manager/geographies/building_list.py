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

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["building"])
def building_list(request):

    # get a list of all buildings with dynamic depth
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        buildings = Building.objects.all()
        serializer = BuildingSerializer(
            buildings, many=True, context={'depth': depth})
        return Response(serializer.data)

    # post a new building
    if request.method == "POST":
        serializer = BuildingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    