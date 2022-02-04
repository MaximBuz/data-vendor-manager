from rest_framework.response import Response
from rest_framework import status

# models
from ....models import ActivityTag

#serializers
from ....serializers.activity_tag import ActivityTagSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ....permissions.permission_decorator import user_has_permissions

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["activitytag"])
def activity_tag_list(request):

    # get a list of all activity tags
    if request.method == "GET":
        depth = int(request.query_params.get('depth', 0))
        tags = ActivityTag.objects.all()
        serializer = ActivityTagSerializer(
            tags, many=True, context={'depth': depth})
        return Response(serializer.data)

    # post a new entity tag instance
    if request.method == "POST":
        serializer = ActivityTagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)