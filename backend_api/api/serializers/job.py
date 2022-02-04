from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import Job
from django.contrib.auth.models import User


class JobSerializer(DynamicDepthSerializer):
    class Meta:
        model = Job
        fields = '__all__'