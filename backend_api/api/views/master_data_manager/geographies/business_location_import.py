from rest_framework.response import Response
from django.http import HttpResponse

# models
from ....models import BusinessLocation

# serializers
from ....serializers.business_location import BusinessLocationCSVSerializer

# statuses
from rest_framework import status

# decorators
from rest_framework.decorators import api_view
from ....permissions.permission_decorator import user_has_permissions

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication

# Reading, writing and downloading csv
import os
import pandas as pd
from wsgiref.util import FileWrapper
import mimetypes
from django.conf import settings
from django.utils.encoding import smart_str
from django.templatetags.static import static

""" Uploading CSV """

@api_view(["POST"])
@authentication_classes([authentication.TokenAuthentication])
@user_has_permissions(modelnames = ["businesslocation"])
def business_location_csv(request):
    serializer = BusinessLocationCSVSerializer(data=request.data)
    if serializer.is_valid():
        file = serializer.validated_data['file']
        reader = pd.read_csv(file, header=0, delimiter=";", encoding="utf-8")
        for _, row in reader.iterrows():
            print(row)
            new_location = BusinessLocation(
                country = row['country'],
                state = row['state'],
                city = row['city'],
                zip_code = row['zip_code'],
                street = row['street'],
                street_nr = row['street_nr'],
            )
            new_location.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
""" Downloading CSV Template """
@api_view(["GET"])
@authentication_classes([authentication.TokenAuthentication])
def business_location_csv_template(request):
    file_path = os.path.join(settings.BASE_DIR, "api/downloadables/csv_templates/location_csv_template.csv")
    file_wrapper = FileWrapper(open(file_path,'rb'))
    file_mimetype = mimetypes.guess_type(file_path)
    response = HttpResponse(file_wrapper, content_type=file_mimetype )
    response['X-Sendfile'] = file_path
    response['Content-Length'] = os.stat(file_path).st_size
    response['Content-Disposition'] = 'attachment; filename=%s' % smart_str('location_csv_template') 
    return response