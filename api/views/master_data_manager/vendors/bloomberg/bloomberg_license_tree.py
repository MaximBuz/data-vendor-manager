from rest_framework.response import Response
from rest_framework import status

# models
from .....models import BloombergFirm

# serializers
from .....serializers.bloomberg_license_tree_serializer import BloombergLicenseTreeSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from .....permissions.permission_decorator import user_has_permissions


@api_view(["GET"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["bloombergfirm"])
def bloomberg_license_tree(request):
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        firms = BloombergFirm.objects.all()
        serializer = BloombergLicenseTreeSerializer(
            firms, many=True, context={'depth': depth})
        return Response(serializer.data)
      