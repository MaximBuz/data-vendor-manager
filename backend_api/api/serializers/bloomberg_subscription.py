from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BloombergSubscription
from django.contrib.auth.models import User


class BloombergSubscriptionSerializer(DynamicDepthSerializer):
    class Meta:
        model = BloombergSubscription
        fields = '__all__'