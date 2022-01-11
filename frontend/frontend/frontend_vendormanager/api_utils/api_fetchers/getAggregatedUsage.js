import apiClient from "../http-common";

export default async function getAggregatedUsage({ queryKey }) {
    const [_, group_by, params] = queryKey;

    // Constructing correct query from passed in params object
    const queryObject = {
      start_date: params.start_date ? params.start_date : null,
      end_date: params.end_date ? params.end_date : null,
      data_consumer: params.data_consumer ? params.data_consumer : null,
      entity: params.entity ? params.entity : null,
      location: params.location ? params.location : null,
      country: params.country ? params.country : null,
      state: params.state ? params.state : null,
      city: params.city ? params.city : null,
      job_title: params.job_title ? params.job_title : null,
      activity_tag: params.activity_tag ? params.activity_tag : null,
      bbg_firm_number: params.bbg_firm_number ? params.bbg_firm_number : null,
      bbg_account_number: params.bbg_account_number ? params.bbg_account_number : null,
      bbg_subscription_id: params.bbg_subscription_id ? params.bbg_subscription_id : null,
      bbg_uuid: params.bbg_uuid ? params.bbg_uuid : null,
    }
    console.log(queryObject);

    // Getting the aggregated data from backend
    const { data } = await apiClient.get(
      `usage/bloomberg/aggregated/${group_by}/`,
      {params: queryObject}
    )

    // Returning the data
    return data; 
}