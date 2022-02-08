from django.urls import path
from .views.master_data_manager.geographies.main import *
from .views.master_data_manager.organizations.main import *
from .views.master_data_manager.employees.main import *
from .views.master_data_manager.vendors.bloomberg.main import *
from .views.cost_manager.main import *

urlpatterns = [
    # -----------------------------------------------------------------------------
    # ---------------------------------- GENERAL ----------------------------------
    # -----------------------------------------------------------------------------

    # ----------------- List Views -----------------

    # organizations
    path('organizational-entity-types/', organizational_entity_types_list,
         name="organizational_entity_types_list"),
    path('organizational-entities/', organizational_entity_list,
         name="organizational_entity_list"),
    path('organizational-entities-root-children/',
         organizational_entity_root_children, name="organizational_entity_root_children"),

    # geographies
    path('business-locations/', business_location_list,
         name="business_location_list"),
    path('buildings/', building_list, name="building_list"),

    # employees
    path('data-consumers/', data_consumers_list, name="data_consumer_list"),
    path('jobs/', job_list, name="job_list"),
    path('activity-tags/', activity_tag_list, name="activity_tag_list"),
    path('random-default-avatar/', get_random_default_avatar, name="get_random_default_avatar"),

    # vendors
    path('bloomberg-firms/',  bloomberg_firm_list, name="bloomberg_firm_list"),
    path('bloomberg-accounts/',  bloomberg_account_list,
         name="bloomberg_account_list"),
    path('bloomberg-subscriptions/',  bloomberg_subscription_list,
         name="bloomberg_subscription_list"),
    path('bloomberg-uuids/',  bloomberg_uuid_list, name="bloomberg_uuid_list"),
    path('bloomberg-serial-numbers/',  bloomberg_serial_numbers_list,
         name="bloomberg_serial_numbers_list"),
    path('bloomberg-license-tree/', bloomberg_license_tree,
         name="bloomberg_license_tree"),
    
    # installed trackers
    path('usage-trackers/<int:uuidId>/', usage_trackers, name="usage_trackers"),
    

    # ----------------- Detail Views -----------------

    # organizations
    path('organizational-entities/<int:id>/',
         organizational_entity_detail, name="organizational_entity_detail"),

    # geographies
    path('business-locations/<int:location_id>/',
         business_location, name="business_location_detail"),
    path('buildings/<int:building_id>/',  building, name="building_detail"),

    # employees
    path('data-consumers/<int:user_id>/',
         data_consumer, name="data_consumer_detail"),

    # vendors
    path('bloomberg-firms/<int:firm_nr_id>/',
         bloomberg_firm, name="bloomberg_firm"),
    path('bloomberg-accounts/<int:account_nr_id>/',
         bloomberg_account, name="bloomberg_account"),
    path('bloomberg-subscriptions/<int:sid>/',
         bloomberg_subscription, name="bloomberg_subscription"),
    path('bloomberg-uuids/<int:uuid_id>/',
         bloomberg_uuid, name="bloomberg_uuid"),
    

    # ----------------- Importing Data -----------------

    path('business-locations/upload/', business_location_csv,
         name="business_location_csv"),
    path('business-locations/template/', business_location_csv_template,
         name="business_location_csv_template"),  # downloading csv template

    # -------------------------------------------------------------------------------------------
    # ---------------------------------- COST MANAGER SPECIFIC ----------------------------------
    # -------------------------------------------------------------------------------------------

    # ----------------- DOWNLOADING TRACKERS -----------------

    path('downloads/usage-tracker-win-installer/', usage_tracker_win_installer_download,
         name="usage_tracker_win_installer_download"),
    path('cost-manager/usage-tracker-download-mail/<int:uuidId>/',
         send_usage_tracker_download_mail, name="send_usage_tracker_download_mail"),




    # ----------------- Posting Usage -----------------
    path('usage/', post_usage_entry, name="post_usage"),
    
    
    # ----------------- Getting Usage -----------------
    
    # getting aggregated usage data grouped by employee (with a lot of filters)
    path('usage/bloomberg/aggregated/data-consumer/',  aggregated_usage_by_dataconsumer,
         name="aggregated_usage_by_dataconsumer"),
    
    # getting aggregated usage data grouped by entity (with a lot of filters)
    path('usage/bloomberg/aggregated/entity/',  aggregated_usage_by_entity,
         name="aggregated_usage_by_entity"),
    
    # getting aggregated usage data grouped by time frequencies (with a lot of filters)
    path('usage/bloomberg/aggregated/time/',  aggregated_usage_by_time,
         name="aggregated_usage_by_time"),
    
    # IDEA: Over time by entity for stacked area plots
    
    # getting aggregated usage data grouped by job (with a lot of filters)
    path('usage/bloomberg/aggregated/job/',  aggregated_usage_by_job,
         name="aggregated_usage_by_job"),
    
    # getting aggregated usage data grouped by activity-tag (with a lot of filters)
    path('usage/bloomberg/aggregated/activity-tag/',  aggregated_usage_by_activity_tag,
         name="aggregated_usage_by_activity_tag"),
    
    # getting aggregated usage data grouped by country (with a lot of filters)
    path('usage/bloomberg/aggregated/country/',  aggregated_usage_by_country,
         name="aggregated_usage_by_country"),

    # getting all usage entries for one specific data_consumer_id
    path('usage/bloomberg/raw/dataconsumer/',  get_usage_entries, name="get_usage_entries"),  # getting usage data (every single row) per user
    
    
    # ----------------- Getting Usage Statistics -----------------
    
    # getting usage statistics for single emplyee
    path('usage/bloomberg/statistics/data-consumer/',  usage_stats_by_dataconsumer,
         name="usage_stats_by_dataconsumer"),
    
    # getting usage statistics across filtered dataset
    path('usage/bloomberg/statistics/data-consumers/',  usage_stats_by_dataconsumers,
         name="usage_stats_by_dataconsumers"),
]
