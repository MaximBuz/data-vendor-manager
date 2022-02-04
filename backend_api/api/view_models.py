from django.db import models
from django.contrib.postgres.fields import ArrayField

class RawUsageAllFieldsAllTime(models.Model):
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  usage_time = models.DurationField()
  data_consumer_pk = models.IntegerField()
  data_consumer_email = models.CharField(max_length=400)
  data_consumer_job_title_pk = models.IntegerField()
  data_consumer_job_title = models.CharField(max_length=400)
  activity_tag_pks = ArrayField(models.BigIntegerField(blank=True))
  activity_tags = ArrayField(models.CharField(max_length=400, blank=True))
  entity_pk = models.IntegerField()
  entity_name = models.CharField(max_length=400)
  location_pk = models.IntegerField()
  location_country = models.CharField(max_length=400)
  location_city = models.CharField(max_length=400)
  location_state = models.CharField(max_length=400)
  bbg_uuid_pk = models.IntegerField()
  bbg_uuid = models.CharField(max_length=400)
  bbg_subscription_pk = models.IntegerField()
  bbg_subscription = models.CharField(max_length=400)
  bbg_account_pk = models.IntegerField()
  bbg_account_number = models.CharField(max_length=400)
  bbg_firm_pk = models.IntegerField()
  bbg_firm_number = models.CharField(max_length=400)
  
  class Meta:
        managed = False
        db_table = 'raw_usage_all_fields_all_time'