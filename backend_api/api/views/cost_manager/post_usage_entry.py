from rest_framework.response import Response
from rest_framework import status

# Serializers
from ...serializers.usage import UsageSerializer

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
# from rest_framework.decorators import authentication_classes
# from rest_framework import authentication

@api_view(["POST"])
def post_usage_entry(request):
  # post a new usage entry
  if request.method == "POST":
    serializer = UsageSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)