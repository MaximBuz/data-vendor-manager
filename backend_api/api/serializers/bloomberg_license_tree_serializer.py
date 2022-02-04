from rest_framework import serializers
from ..models import BloombergFirm, BloombergAccount, BloombergSubscription, BloombergUUID, DataConsumer, BusinessLocation, OrganizationalEntity
from django.contrib.auth.models import User


""" non-bloomberg-data """
class BusinessLocationTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model= BusinessLocation
        fields= ["id", "country","city", "street"]

class DataConsumerTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataConsumer
        fields = ["id", "email"]
        
class OrganizationalEntityTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationalEntity
        fields = ["id", "name"]


""" bloomberg-data """
class BloombergUUIDTreeSerializer(serializers.ModelSerializer):
    data_consumer = DataConsumerTreeSerializer(read_only = True)
    key = serializers.CharField(source='uuid', read_only=True)
    
    class Meta:
        model = BloombergUUID
        fields = ["key", "name", "description", "data_consumer"]

class BloombergSubscriptionTreeSerializer(serializers.ModelSerializer):
    children = BloombergUUIDTreeSerializer(many=True, read_only=True)
    key = serializers.CharField(source='subscription_id', read_only=True)
    
    class Meta:
        model = BloombergSubscription
        fields = ["key", "name", "description", "children"]

class BloombergAccountTreeSerializer(serializers.ModelSerializer):
    children = BloombergSubscriptionTreeSerializer(many=True, read_only=True)
    key = serializers.CharField(source='account_number', read_only=True)
    location = BusinessLocationTreeSerializer()
    
    class Meta:
        model = BloombergAccount
        fields = ["key", "name", "description", "location", "children"]

class BloombergLicenseTreeSerializer(serializers.ModelSerializer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.depth = 1
        
    children = BloombergAccountTreeSerializer(many=True, read_only=True)
    organizational_entity = OrganizationalEntityTreeSerializer()
    key = serializers.CharField(source='firm_number', read_only=True)
    
    class Meta:
        model = BloombergFirm
        fields = ["key", "name", "description", "organizational_entity", "children"]
        
