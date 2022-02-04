from rest_framework import serializers
from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import OrganizationalEntity
from django.contrib.auth.models import User

# This serializer gets all children of a parent entity recursively

class ChildrenSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data
        

class OrganizationalEntitySerializer(DynamicDepthSerializer):
    children = ChildrenSerializer(many=True)
    
    # These custom fields are for tree structures in Ant Design
    label = serializers.CharField(source='name')
    title = serializers.CharField(source='name')
    value = serializers.IntegerField(source='id')
    key = serializers.IntegerField(source='id')
    
    class Meta:
        model = OrganizationalEntity
        fields = "__all__"
        
class OrganizationalEntityPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationalEntity
        fields = "__all__"
        
class OrganizationalEntityPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationalEntity
        fields = "__all__"