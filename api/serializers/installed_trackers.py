from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import InstalledTrackers
from django.contrib.auth.models import User


class InstalledTrackersSerializer(DynamicDepthSerializer):
    class Meta:
        model = InstalledTrackers
        fields = '__all__'