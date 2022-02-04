from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(OrganizationalEntityTypes)
admin.site.register(OrganizationalEntity)
admin.site.register(Job)
admin.site.register(ActivityTag)
admin.site.register(BusinessLocation)
admin.site.register(Building)
admin.site.register(DataConsumer)
admin.site.register(BloombergFirm)
admin.site.register(BloombergAccount)
admin.site.register(BloombergSubscription)
admin.site.register(BloombergUUID)
admin.site.register(BloombergSerialNumber)
admin.site.register(CustomVendorDefinition)
admin.site.register(CustomVendorValue)
admin.site.register(Usage)
admin.site.register(DefaultAvatar)
admin.site.register(InstalledTrackers)