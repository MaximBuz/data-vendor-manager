# import custom serializers
from .CustomSerializers.DynamicDepthSerializer import DynamicDepthSerializer
from .CustomSerializers.CustomDurationField import CustomDurationField

from ..models import Usage
from ..view_models import RawUsageAllFieldsAllTime
from django.contrib.auth.models import User
from rest_framework import serializers

class UsageSerializer(DynamicDepthSerializer):
    class Meta:
        model = Usage
        fields = '__all__'
        
# For postgreSQL View 'raw_usage_all_fields_all_time'
class RawUsageAllFieldsAllTimeSerializer(serializers.ModelSerializer):
    class Meta:
      model = RawUsageAllFieldsAllTime
      fields = "__all__"
      
class RawUsageDataConsumer(serializers.Serializer):
  start_time = serializers.DateTimeField()
  end_time = serializers.DateTimeField()
  usage_time = CustomDurationField()
      
# Aggregierte Daten
class AggregatedUsageDataconsumerSerializer(serializers.Serializer):
    usage_time = CustomDurationField()
    data_consumer_pk = serializers.IntegerField()
    data_consumer_email = serializers.CharField(max_length=200)
    data_consumer_job_title_pk = serializers.IntegerField()
    data_consumer_job_title = serializers.CharField(max_length=200)
    activity_tag_pks = serializers.ListField()
    activity_tags = serializers.ListField()
    entity_pk = serializers.IntegerField()
    entity_name = serializers.CharField(max_length=200)
    location_pk = serializers.IntegerField()
    location_country = serializers.CharField(max_length=200)
    location_city = serializers.CharField(max_length=200)
    location_state = serializers.CharField(max_length=200)
    bbg_uuid_pk = serializers.IntegerField()
    bbg_uuid = serializers.CharField(max_length=200)
    bbg_subscription_pk = serializers.IntegerField()
    bbg_subscription = serializers.CharField(max_length=200)
    bbg_account_pk = serializers.IntegerField()
    bbg_account_number = serializers.CharField(max_length=200)
    bbg_firm_pk = serializers.IntegerField()
    bbg_firm_number = serializers.CharField(max_length=200)
    
class AggregatedUsageEntitySerializer(serializers.Serializer):
    usage_time = CustomDurationField()
    entity_pk = serializers.IntegerField()
    entity_name = serializers.CharField(max_length=200)
    
class AggregatedUsageByTimeSerializer(serializers.Serializer):
    start_time = serializers.CharField(max_length=200)
    sum = CustomDurationField()

class AggregatedUsageByJobSerializer(serializers.Serializer):
    usage_time = CustomDurationField()
    data_consumer_job_title_pk = serializers.IntegerField()
    data_consumer_job_title = serializers.CharField(max_length=200)

class AggregatedUsageByActivitySerializer(serializers.Serializer):
    usage_time = CustomDurationField()
    activity_tag_pk = serializers.IntegerField()
    activity_tag = serializers.CharField(max_length=200)

class AggregatedUsageByCountrySerializer(serializers.Serializer):
    usage_time = CustomDurationField()
    location_country = serializers.CharField(max_length=200)
    
    
# Statistiken
class UsageStatisticsByDataconsumer(serializers.Serializer):
  count = serializers.IntegerField()
  mean = CustomDurationField()
  std = CustomDurationField()
  min = CustomDurationField()
  first_quartile = CustomDurationField()
  second_quartile = CustomDurationField()
  third_quartile = CustomDurationField()
  max = CustomDurationField()
  sum = CustomDurationField()
  
class UsageStatisticsByDataconsumers(serializers.Serializer):
  count = serializers.IntegerField()
  mean = CustomDurationField()
  std = CustomDurationField()
  min = CustomDurationField()
  first_quartile = CustomDurationField()
  second_quartile = CustomDurationField()
  third_quartile = CustomDurationField()
  max = CustomDurationField()
  