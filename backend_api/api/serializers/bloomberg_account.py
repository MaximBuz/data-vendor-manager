from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BloombergAccount
from django.contrib.auth.models import User

class BloombergAccountSerializer(DynamicDepthSerializer):

    class Meta:
        model = BloombergAccount
        fields = '__all__'