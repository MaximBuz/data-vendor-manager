from rest_framework import status
from rest_framework.response import Response

# models
from ....models import OrganizationalEntity

# serializers
from ....serializers.organizational_entity import OrganizationalEntityPostSerializer, OrganizationalEntitySerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["organizationalentity"])
def organizational_entity_list(request):

    # get a list of all entities
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        entities = OrganizationalEntity.objects.all()
        serializer = OrganizationalEntitySerializer(
            entities, many=True, context={'depth': depth})
        return Response(serializer.data)

    # post a new entity
    if request.method == "POST":
        serializer = OrganizationalEntityPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
