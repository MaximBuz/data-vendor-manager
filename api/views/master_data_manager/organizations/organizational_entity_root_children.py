from rest_framework import status
from rest_framework.response import Response

# models
from ....models import OrganizationalEntity

# serializers
from ....serializers.organizational_entity import OrganizationalEntitySerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["organizationalentity"])
def organizational_entity_root_children(request):

    # get a list of organizations without any parents (root orgs) with all related children (recursively)
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        types = OrganizationalEntity.objects.filter(parent__isnull=True)
        serializer = OrganizationalEntitySerializer(
            types, many=True, context={'depth': depth})
        return Response(serializer.data)