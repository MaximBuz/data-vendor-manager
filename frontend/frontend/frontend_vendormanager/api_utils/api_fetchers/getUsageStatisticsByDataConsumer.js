import apiClient from "../http-common";

export default async function getUsageStatisticsByDataConsumer({ queryKey }) {
    const [_, group_by, params] = queryKey;

    // Getting the aggregated statistics from backend
    const { data } = await apiClient.get(
      `usage/bloomberg/statistics/data-consumer/`,
      {params: params}
    )

    // Returning the data
    return data; 
}