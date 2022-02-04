from rest_framework.response import Response
from rest_framework import status

# models
from .....models import InstalledTrackers

# serializers
from .....serializers.installed_trackers import InstalledTrackersSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from .....permissions.permission_decorator import user_has_permissions


@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["installedtrackers"])
def usage_trackers(request, uuidId):
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        installed_trackers = InstalledTrackers.objects.filter(license_uuid__pk = uuidId)
        serializer = InstalledTrackersSerializer(
            installed_trackers, many=True, context={'depth': depth})
        return Response(serializer.data)

    if request.method == "POST":
        serializer = InstalledTrackersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
