from .models import OrganizationalEntityTypes
from dj_rest_auth.models import TokenModel as Token
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, force_authenticate, APIRequestFactory
from rest_framework import status

from api.models import *

password="18234567tester"
username="test_cases"
email="test@mail.com"

class BaseSetUp(APITestCase):
    def setUp(self):
      self.factory = APIRequestFactory()
      self.user = User.objects.create_superuser(username=username, email=email, password=password)
      self.token = Token.objects.create(user=self.user)
      self.token.save()
    
    def tearDown(self):
      User.objects.filter(username=username).delete()
      Token.objects.filter(user=self.user).delete()
  

from api.views.master_data_manager.organizations.organizational_entity_types_list import organizational_entity_types_list
class OrganizationalEntityTypesTests(BaseSetUp):
  
  def test_get_organizational_entity_types(self):
    """
    Ensure we can view a list organizational-entity-type.
    """  
    # creating models instance
    OrganizationalEntityTypes.objects.create(name="initializing")
    
    url = reverse('organizational_entity_types_list')
    view = organizational_entity_types_list    
    request = self.factory.get(url, format='json')
    force_authenticate(request, user=self.user)
    response = view(request)
    
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data, [{"id":1, "name": "initializing"}])
  
  def test_post_organizational_entity_type(self):
    """
    Ensure we can create a new organizational-entity-type.
    """  
    data = {"name": "test_organizational_entity_type"}
    
    url = reverse('organizational_entity_types_list')
    view = organizational_entity_types_list   
    request = self.factory.post(url, data, format='json')
    force_authenticate(request, user=self.user)
    response = view(request)
    
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response.data["name"], "test_organizational_entity_type")

  