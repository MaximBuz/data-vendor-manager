from django.db import models
from django.db.models.deletion import CASCADE

""" Geographical Data """


class BusinessLocation(models.Model):
    country = models.CharField(max_length=400)
    state = models.CharField(max_length=400, blank=True, null=True)
    city = models.CharField(max_length=400)
    zip_code = models.CharField(max_length=400, blank=True, null=True)
    street = models.CharField(max_length=400, blank=True, null=True)
    street_nr = models.CharField(max_length=400, blank=True, null=True)

    def __str__(self):
        return str(self.country) + " " + str(self.city) + " " + str(self.street)


class Building(models.Model):
    building_name = models.CharField(max_length=400)
    building_location = models.ForeignKey(
        BusinessLocation, on_delete=models.CASCADE, related_name="buildings")

    def __str__(self):
        return str(self.building_name) + " " + str(self.building_location)


""" Organizational Custom Structuring """


class OrganizationalEntityTypes(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class OrganizationalEntity(models.Model):
    type = models.ForeignKey(OrganizationalEntityTypes,
                             on_delete=models.SET_NULL, null=True, blank=False)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True, null=True)
    internal_id = models.CharField(
        max_length=300, blank=True, null=True, help_text="ID from your organizations ERP system")
    parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.SET_NULL,
                               related_name="children", help_text="Choose a parent entity")
    bbg_lei_code = models.CharField(max_length=400, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)
        """ return str(self.name) + " < " + str(self.parent or "") """


class Job(models.Model):
    title = models.CharField(max_length=400)

    def __str__(self):
        return self.title


class ActivityTag(models.Model):
    name = models.CharField(max_length=400)

    def __str__(self):
        return self.name


""" Data on the users """


class DataConsumer(models.Model):
    # Persöhnliche Daten
    internal_id = models.CharField(
        max_length=400, blank=True, null=True, help_text="ID from your organizations ERP/HR system")
    email = models.EmailField()
    first_name = models.CharField(max_length=400, blank=True, null=True)
    last_name = models.CharField(max_length=400, blank=True, null=True)

    # Tätigkeiten
    job_title = models.ForeignKey(
        Job, on_delete=models.SET_NULL, blank=True, null=True)
    activity = models.ManyToManyField(ActivityTag, blank=True, null=True)

    # Zugehörigkeiten
    organizational_entity = models.ForeignKey(
        OrganizationalEntity, on_delete=models.SET_NULL, null=True, blank=False)

    # Location at Site
    location = models.ForeignKey(
        BusinessLocation, blank=True, null=True, on_delete=models.SET_NULL)
    building = models.ForeignKey(
        Building, on_delete=models.SET_NULL, blank=True, null=True)
    floor = models.CharField(max_length=400, blank=True, null=True)
    seat = models.CharField(max_length=400, blank=True, null=True)

    def __str__(self):
        return self.email


""" Bloomberg Licensing Data"""


class BloombergFirm(models.Model):
    name = models.CharField(max_length=400, default="Bloomberg Firm Number")
    description = models.TextField(max_length=4000, default="An account must be under a firm number. Firm number can be regarded as the 'umbrella' number under which all related accounts are grouped. These accounts/entities under the same umbrella have to be in a control relationship with one another or under a common control.")
    firm_number = models.CharField(max_length=400)
    organizational_entity = models.ForeignKey(
        OrganizationalEntity, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.organizational_entity)


class BloombergAccount(models.Model):
    name = models.CharField(max_length=400, default="Bloomberg Account Number")
    description = models.TextField(max_length=4000, default="An account number, or a customer number, is created for every location where billable SIDs (licenses), circuits or services are installed. Multiple account numbers can be created in one location if required for billing / administrative purposes.")
    account_number = models.CharField(max_length=400)
    location = models.ForeignKey(BusinessLocation, on_delete=models.CASCADE)
    firm_number = models.ForeignKey(
        BloombergFirm, related_name="children", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.location) + " " + str(self.account_number)


class BloombergSubscription(models.Model):
    name = models.CharField(
        max_length=400, default="Bloomberg Subscription Identifier (SID)")
    description = models.TextField(max_length=4000, default="An SID is a unique number which Bloomberg uses to track the progression of a license. SIDs are also linked to any entitlements or exchanges, allowing them to be carried across various actions. SID attached to a service are considered billable and represent one paid license.")
    subscription_id = models.CharField(max_length=400)
    bloomberg_account = models.ForeignKey(
        BloombergAccount, related_name="children", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.subscription_id)


class BloombergUUID(models.Model):
    name = models.CharField(
        max_length=400, default="Unique User Identifier (UUID)")
    description = models.TextField(max_length=4000, default="A UUID is a unique number assigned to every Bloomberg login (username).")
    uuid = models.CharField(max_length=400,)
    bloomberg_subscription = models.ForeignKey(
        BloombergSubscription, related_name="children", on_delete=models.CASCADE)
    data_consumer = models.ForeignKey(
        DataConsumer, related_name="data_consumers", on_delete=models.DO_NOTHING)
    
    def __str__(self):
      return str(self.data_consumer) + " - " + str(self.uuid)


class BloombergSerialNumber(models.Model):
    serial_numner = models.CharField(
        max_length=400, help_text="Each instance of software has its own serial number that is unique to that installation. This can be found by hitting the cancel key and the S/N is located at the bottom left corner. All serial number would be associated with an SID number.")
    bloomberg_subscription = models.ForeignKey(
        BloombergSubscription, on_delete=models.CASCADE)

      
class InstalledTrackers(models.Model):
  name = models.CharField(max_length=400, default="Bloomberg Anywhere Tracker")
  license_uuid = models.ForeignKey(BloombergUUID, on_delete=models.DO_NOTHING)
  created_at = models.DateTimeField(auto_now_add=True)

""" Custom Vendor Licensing Data """


class CustomVendorDefinition(models.Model):
    name = models.CharField(max_length=400)
    custom_fields = models.JSONField()

    def __str__(self):
        return str(self.name)


class CustomVendorValue(models.Model):
    vendor = models.ForeignKey(
        CustomVendorDefinition, on_delete=models.CASCADE)
    data = models.JSONField()

    def __str__(self):
        return str(str(self.name) + " data")


""" Usage Tracking """


class Usage(models.Model):
    data_consumer = models.ForeignKey(DataConsumer, on_delete=models.CASCADE)
    app_name = models.CharField(max_length=400, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()


""" MISC """

class DefaultAvatar(models.Model):
  image = models.ImageField(upload_to='media/')