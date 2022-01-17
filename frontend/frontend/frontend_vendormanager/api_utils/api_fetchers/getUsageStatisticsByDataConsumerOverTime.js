import apiClient from "../http-common";

export default async function getUsageStatisticsByDataConsumerOverTime({ queryKey }) {
    const [_, group_by, params] = queryKey;

    // Getting the aggregated statistics from backend
    const { data } = await apiClient.get(
      `usage/bloomberg/statistics/data-consumer-over-time/`,
      {params: params}
    )

    // Returning the data
    return data; 
}