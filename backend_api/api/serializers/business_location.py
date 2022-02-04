from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from ..models import BusinessLocation
from django.contrib.auth.models import User
from .building import BuildingSerializerAsChildren
from rest_framework import serializers

""" Getting List data """


class BusinessLocationSerializer(DynamicDepthSerializer):
    buildings = BuildingSerializerAsChildren(many=True)

    # These custom fields are for tree structures in Ant Design
    key = serializers.IntegerField(source='id')

    class Meta:
        model = BusinessLocation
        fields = ["id", "country", "state", "city", "zip_code",
                  "street", "street_nr", "buildings", "key"]


""" Updating Business Location Data """


class BusinessLocationPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLocation
        fields = "__all__"


""" Adding new Business Location """


class BusinessLocationPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLocation
        fields = "__all__"


""" Uploading CSV File with data on locations """


class BusinessLocationCSVSerializer(serializers.Serializer):
    file = serializers.FileField()
