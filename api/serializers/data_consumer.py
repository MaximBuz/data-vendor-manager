from rest_framework import serializers
from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import DataConsumer
from django.contrib.auth.models import User

""" Getting list of all  """
class DataConsumerSerializer(DynamicDepthSerializer):
    # These custom fields are for tree structures in Ant Design
    key = serializers.IntegerField(source='id', read_only=True)
    
    class Meta:
        model = DataConsumer
        fields = "__all__"
        
