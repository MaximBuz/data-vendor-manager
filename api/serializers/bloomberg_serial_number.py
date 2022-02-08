from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BloombergSerialNumber
from django.contrib.auth.models import User


class BloombergSerialNumberSerializer(DynamicDepthSerializer):
    class Meta:
        model = BloombergSerialNumber
        fields = '__all__'