from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BloombergUUID
from django.contrib.auth.models import User


class BloombergUUIDSerializer(DynamicDepthSerializer):
    class Meta:
        model = BloombergUUID
        fields = '__all__'