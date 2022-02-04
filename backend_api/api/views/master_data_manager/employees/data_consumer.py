from rest_framework.response import Response
from rest_framework import status

# models
from ....models import DataConsumer

#serializers
from ....serializers.data_consumer import DataConsumerSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["dataconsumer"])
def data_consumer(request, user_id):
    try:
        data_consumer = DataConsumer.objects.get(pk=user_id)
    except DataConsumer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # get the details on one data_consumer by id
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        serializer = DataConsumerSerializer(
            data_consumer, context={'depth': depth})
        return Response(serializer.data)

    # update a data_consumer by id
    if request.method == "PATCH":
        serializer = DataConsumerSerializer(
            data_consumer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete data_consumer by id
    if request.method == "DELETE":
        data_consumer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
