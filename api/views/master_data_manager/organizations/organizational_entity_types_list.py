from rest_framework import status
from rest_framework.response import Response

# models
from ....models import OrganizationalEntityTypes

# serializers
from ....serializers.organizational_entity_types import OrganizationalEntityTypesSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["organizationalentitytypes"])
def organizational_entity_types_list(request):

    # get a list of all entity types
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        types = OrganizationalEntityTypes.objects.all()
        serializer = OrganizationalEntityTypesSerializer(
            types, many=True, context={'depth': depth})
        return Response(serializer.data)

    # post a new entity type
    if request.method == "POST":
        serializer = OrganizationalEntityTypesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)