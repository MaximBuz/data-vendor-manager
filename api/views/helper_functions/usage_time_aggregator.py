# Helper functions
from itertools import groupby
from .query_param_getter import get_standart_params

# Models
from ...view_models import RawUsageAllFieldsAllTime

# Data analysis tools
from django.db.models import Func, F
import pandas as pd


def aggregate_usage_time(column_name, usage_entries, return_stats=False):
  usage_entry_values = usage_entries.values()
  df = pd.DataFrame.from_records(usage_entry_values, index="id")
  df["usage_time"] = df["end_time"] - df["start_time"]

  # aggregate data on data consumers
  df.drop(["end_time", "start_time"], axis=1, inplace=True)
  data = df.groupby(column_name, as_index=False).agg(
      lambda x: x.sum() if x.dtype == 'timedelta64[ns]' else x.head(1)).sort_values("usage_time", ascending=False).reset_index()

  # get statistics from dataset
  if return_stats:
    stat_data = data.filter(["usage_time"])
    statistics = stat_data.describe().transpose()
    statistics["sum"] = stat_data["usage_time"].sum()
    statistics.rename(columns={
        '25%': 'first_quartile',
        '50%': 'second_quartile',
        '75%': 'third_quartile',
    }, inplace=True)
    return data, statistics

  return data


def get_filtered_aggregated_data(request, group_by_column, return_stats=False):
  # construct db query from all standart query parameters
  q = get_standart_params(request)

  # Query database based on all the query parameters
  if group_by_column == "activity_tag_pk":
    usage_entries = RawUsageAllFieldsAllTime.objects.filter(q).annotate(activity_tag_pk=Func(
        F("activity_tag_pks"), function="unnest")).annotate(activity_tag=Func(F("activity_tags"), function="unnest"))
  else:
    usage_entries = RawUsageAllFieldsAllTime.objects.filter(q)

  try:
    # aggregate the data with summed time per groupy_by_column
    if return_stats:
      aggregated_data, statistics = aggregate_usage_time(group_by_column, usage_entries, return_stats)
    else:
      aggregated_data = aggregate_usage_time(group_by_column, usage_entries)
  except BaseException as error:
    raise error

  # Handle advanced query parameter "percentile"
  if ((percentile := request.query_params.get('percentile', 0)) and (percentile_direction := request.query_params.get('percentile_direction', 0))):
    if percentile_direction == "top":
      percentile = 1 - (int(percentile) / 100)
      total_percentile = aggregated_data.filter(["usage_time"])["usage_time"].quantile(percentile)
      aggregated_data = aggregated_data[aggregated_data["usage_time"] > total_percentile]
    elif percentile_direction == "bottom":
      percentile = (int(percentile) / 100)
      total_percentile = aggregated_data.filter(["usage_time"])["usage_time"].quantile(percentile)
      aggregated_data = aggregated_data[aggregated_data["usage_time"] < total_percentile]

  if return_stats:
    return aggregated_data, statistics
  return aggregated_data
