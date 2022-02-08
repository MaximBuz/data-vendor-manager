from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import Building
from django.contrib.auth.models import User

""" Get Building with all Fields """
class BuildingSerializer(DynamicDepthSerializer):
    class Meta:
        model = Building
        fields = '__all__'
        
""" Get Building with only id and name Fields """
class BuildingSerializerAsChildren(DynamicDepthSerializer):
    class Meta:
        model = Building
        fields = ["id", "building_name"]