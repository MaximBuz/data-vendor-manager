from rest_framework import status
from rest_framework.response import Response

# models
from ....models import OrganizationalEntity

# serializers
from ....serializers.organizational_entity import OrganizationalEntityPatchSerializer ,OrganizationalEntitySerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["organizationalentity"])
def organizational_entity_detail(request, id):

    # get an entity by id with all related children (recursively)
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        entity = OrganizationalEntity.objects.filter(pk=id)
        serializer = OrganizationalEntitySerializer(
            entity, many=True, context={'depth': depth})
        return Response(serializer.data)

    # patch an entity by id
    if request.method == "PATCH":
        entity = OrganizationalEntity.objects.get(pk=id)
        serializer = OrganizationalEntityPatchSerializer(
            entity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete an entity by id
    if request.method == "DELETE":
        entity = OrganizationalEntity.objects.get(pk=id)
        entity.delete()
        return Response(status=status.HTTP_201_CREATED)
