from rest_framework.serializers import DurationField

def _get_duration_components(duration):
    days = duration.days if str(duration.days) != "nan" else 0
    seconds = duration.seconds if str(duration.seconds) != "nan"  else 0
    microseconds = duration.microseconds if str(duration.microseconds) != "nan"  else 0

    minutes = seconds // 60
    seconds = seconds % 60

    hours = minutes // 60
    minutes = minutes % 60

    return days, hours, minutes, seconds, microseconds
  
class CustomDurationField(DurationField):
  def to_representation(self, value):
    days, hours, minutes, seconds, microseconds = _get_duration_components(value)
    string = '{}d:{:02d}h:{:02d}m:{:02d}s'.format(days, hours, minutes, seconds)
    if string == "00:00:00":
      string = "undefined"
    return string