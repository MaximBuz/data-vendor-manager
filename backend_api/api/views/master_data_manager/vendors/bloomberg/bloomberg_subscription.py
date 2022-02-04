from rest_framework.response import Response
from rest_framework import status

# models
from .....models import BloombergSubscription

# serializers
from .....serializers.bloomberg_subscription import BloombergSubscriptionSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from .....permissions.permission_decorator import user_has_permissions


@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["bloombergsubscription"])
def bloomberg_subscription(request, sid):
    # find object in database
    try:
        subscription = BloombergSubscription.objects.get(pk=sid)
    except BloombergSubscription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # get firm number by id with all related buildings
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        serializer = BloombergSubscriptionSerializer(
            subscription, context={'depth': depth})
        return Response(serializer.data)

    # update one location by id
    if request.method == "PATCH":
        serializer = BloombergSubscriptionSerializer(
            subscription, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete one location by id
    if request.method == "DELETE":
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
