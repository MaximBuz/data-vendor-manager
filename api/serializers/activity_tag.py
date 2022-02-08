from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import ActivityTag
from django.contrib.auth.models import User


class ActivityTagSerializer(DynamicDepthSerializer):
    class Meta:
        model = ActivityTag
        fields = '__all__'