from rest_framework.response import Response
from rest_framework import status

# models
from .....models import BloombergUUID

# serializers
from .....serializers.bloomberg_uuid import BloombergUUIDSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from .....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["bloomberguuid"])
def bloomberg_uuid(request, uuid_id):
    # find object in database
    try:
        uuid = BloombergUUID.objects.get(pk=uuid_id)
    except BloombergUUID.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # get uuid by id with the related data consumer
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        serializer = BloombergUUIDSerializer(
            uuid, context={'depth': depth})
        return Response(serializer.data)

    # update one uuid by id
    if request.method == "PATCH":
        serializer = BloombergUUIDSerializer(
            uuid, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete one uuid by id
    if request.method == "DELETE":
        uuid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
