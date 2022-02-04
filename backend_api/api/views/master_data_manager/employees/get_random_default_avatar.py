from django.http import HttpResponse

# models
from ....models import DefaultAvatar

# decorators
from rest_framework.decorators import api_view

# MISC
import random

@api_view(["GET"])
def get_random_default_avatar(request):
  
  # Get default avatars
  avatars = DefaultAvatar.objects.all()
  length = len(avatars)
  
  # Get random avatar
  avatar = avatars[random.sample([i for i in range(length-1)], 1)[0]].image
  
  return HttpResponse(avatar, content_type="image/png")