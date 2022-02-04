from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status

# decorators
from rest_framework.decorators import api_view

# Authentication and Users
from rest_framework.decorators import authentication_classes
from rest_framework import authentication
from ...permissions.permission_decorator import user_has_permissions

# Downloading files
import os
from wsgiref.util import FileWrapper
import mimetypes
from django.conf import settings
from django.utils.encoding import smart_str

# Email
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from smtplib import SMTPException

# Models
from ...models import BloombergUUID, InstalledTrackers


""" Downloading Usage Tracker Windows Installer """


@api_view(["GET"])
def usage_tracker_win_installer_download(request):
  file_path = os.path.join(settings.BASE_DIR, "api/downloadables/usage_tracker_installer.exe")
  file_wrapper = FileWrapper(open(file_path, 'rb'))
  file_mimetype = mimetypes.guess_type(file_path)
  response = HttpResponse(file_wrapper, content_type=file_mimetype)
  response['X-Sendfile'] = file_path
  response['Content-Length'] = os.stat(file_path).st_size
  response['Content-Disposition'] = 'attachment; filename=%s' % smart_str('usage_tracker_installer')
  return response


@api_view(["GET"])
@user_has_permissions(modelnames = ["bloomberguuid"])
@authentication_classes([authentication.TokenAuthentication])
def send_usage_tracker_download_mail(request, uuidId):
  # get the recepient from data consumer table
  try:
    data_consumer = BloombergUUID.objects.get(pk=uuidId).data_consumer
  except BloombergUUID.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  email_subject = "Please Install this file"
  email_of_sender = "test@3B.com"
  email_of_recepient = data_consumer.email

  context = ({
      "first_name": data_consumer.first_name,
      "last_name": data_consumer.last_name,
      "id": data_consumer.id,
  })

  text_content = render_to_string("send_usage_tracker_download_mail.txt",
                                  context,
                                  request=request)
  html_content = render_to_string("send_usage_tracker_download_mail.html",
                                  context,
                                  request=request)

  try:
    email_message = EmailMultiAlternatives(
        subject=email_subject,
        body=text_content,
        from_email=email_of_sender,
        to=[email_of_recepient],
        reply_to=[email_of_sender]
    )
    email_message.attach_alternative(html_content, "text/html")
    email_message.send(fail_silently=False)

    # when this worked, write to database that tracker has been installed
    tracker = InstalledTrackers(name="Bloomberg Anywhere Tracker",
                                license_uuid=BloombergUUID.objects.get(pk=int(uuidId)))
    tracker.save()

  except SMTPException as e:
    print('There was an error sending an email: ', e)
    error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
    # Else, return fail JSON
    return Response(error, status=status.HTTP_400_BAD_REQUEST)
  return Response(status=status.HTTP_200_OK)
