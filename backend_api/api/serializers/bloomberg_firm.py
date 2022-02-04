from rest_framework import serializers
from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BloombergFirm
from django.contrib.auth.models import User

class BloombergFirmSerializer(DynamicDepthSerializer):
    class Meta:
        model = BloombergFirm
        fields = '__all__'