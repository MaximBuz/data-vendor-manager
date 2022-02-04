from django.db.models import Q, Count

# Models
from ...view_models import RawUsageAllFieldsAllTime

# Misc
from datetime import datetime
from dateutil.relativedelta import relativedelta

def get_standart_params(request):
    # initialize pandas querying
    q = Q()

    # grab all query items from url params for filtering
    start_date = request.query_params.get(
        'start_date', (datetime.today() - relativedelta(months=1)).strftime('%Y-%m-%d'))
    q &= Q(start_time__gte=start_date)

    end_date = request.query_params.get(
        'end_date', (datetime.today() + relativedelta(days=1)).strftime('%Y-%m-%d'))
    q &= Q(start_time__lte=end_date)

    data_consumer_pk = request.GET.getlist('data_consumer[]', 0)
    if data_consumer_pk:
        q &= Q(data_consumer_pk__in=data_consumer_pk)

    entity_pk = request.GET.getlist('entity[]', 0)
    if entity_pk:
        q &= Q(entity_pk__in=entity_pk)
        
    entity_exclude_pk = request.GET.getlist('entity_exclude[]', 0)
    if entity_exclude_pk:
        q &= ~Q(entity_pk__in=entity_exclude_pk)

    location_pk = request.GET.getlist('location[]', 0)
    if location_pk:
        q &= Q(location_pk__in=location_pk)

    country = request.query_params.get('country', 0)
    if country:
        q &= Q(location_country__icontains=country)

    state = request.query_params.get('state', 0)
    if state:
        q &= Q(location_state__icontains=state)

    city = request.query_params.get('city', 0)
    if city:
        q &= Q(location_city__icontains=city)

    job_title_pk = request.GET.getlist('job_title[]', 0)
    if job_title_pk:
        q &= Q(data_consumer_job_title_pk__in=job_title_pk)
        
    job_title_exclude = request.GET.getlist('job_title_exclude[]', 0)
    if job_title_exclude:
        q &= ~Q(data_consumer_job_title_pk__in=job_title_exclude)

    activity_tag_pk = request.GET.getlist('activity_tag[]', 0)
    if activity_tag_pk:
        q &= Q(activity_tag_pks__overlap=activity_tag_pk)
        
    activity_tag_exclude = request.GET.getlist('activity_tag_exclude[]', 0)
    if activity_tag_exclude:
        q &= ~Q(activity_tag_pks__overlap=activity_tag_exclude)

    bbg_firm_number_pk = request.query_params.get('bbg_firm_number[]', 0)
    if bbg_firm_number_pk:
        q &= Q(bbg_firm_number_pk__in=bbg_firm_number_pk)

    bbg_account_number_pk = request.GET.getlist('bbg_account_number[]', 0)
    if bbg_account_number_pk:
        q &= Q(bbg_account_number_pk__in=bbg_account_number_pk)

    bbg_subscription_id_pk = request.GET.getlist('bbg_subscription_id[]', 0)
    if bbg_subscription_id_pk:
        q &= Q(bbg_subscription_id_pk__in=bbg_subscription_id_pk)

    bbg_uuid_pk = request.GET.getlist('bbg_uuid[]', 0)
    if bbg_uuid_pk:
        q &= Q(bbg_uuid_pk__in=bbg_uuid_pk)
        
    # Handle advanced query parameter "entry_count"
    entry_count = request.query_params.get('entry_count', 0)
    entry_count_direction = request.query_params.get('entry_count_direction', 0)
    if entry_count and entry_count_direction:
      annotated_values = RawUsageAllFieldsAllTime.objects.values("data_consumer_pk").annotate(count=Count("data_consumer_pk")).values("data_consumer_pk")
      if entry_count_direction == ">":
        filtered = annotated_values.filter(count__gte = entry_count)
      elif entry_count_direction == "<":
        filtered = annotated_values.filter(count__lte = entry_count)
      q &= Q(data_consumer_pk__in = filtered)
        
    return q