from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import OrganizationalEntityTypes
from django.contrib.auth.models import User


class OrganizationalEntityTypesSerializer(DynamicDepthSerializer):
    class Meta:
        model = OrganizationalEntityTypes
        fields = '__all__'