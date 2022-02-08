from rest_framework.response import Response
from rest_framework import status

# models
from ....models import DataConsumer

#serializers
from ....serializers.data_consumer import DataConsumerSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from django.contrib.auth.models import User
from ....permissions.permission_decorator import user_has_permissions
from rest_framework.decorators import authentication_classes
from rest_framework import authentication

@api_view(["GET", "POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["dataconsumer"])
def data_consumers_list(request):    
    
    # get a list of all data consumers
    if request.method == "GET":
        
        # Determines the depth of the nesting of the JSON response (i.e. /?depth=1)
        depth = int(request.query_params.get('depth', 0))
        location = int(request.query_params.get('location', 0))

        # Get the data consumers from database and filter by location
        if location:
            data_consumers = DataConsumer.objects.filter(location__pk=location)
        else:
            data_consumers = DataConsumer.objects.all()

        # Translate the data into JSON
        serializer = DataConsumerSerializer(
            data_consumers, many=True, context={'depth': depth})

        # Send (browsable) API response
        return Response(serializer.data)

    # post a new data consumer
    if request.method == "POST":
        # Translate the posted JSON data into Python
        serializer = DataConsumerSerializer(data=request.data)

        # Data Validation
        if serializer.is_valid():
            # Save data to database
            serializer.save()

            # Return success JSON
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Else, return fail JSON
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
