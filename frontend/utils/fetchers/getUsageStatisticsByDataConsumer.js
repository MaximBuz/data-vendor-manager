import apiClient from "../http-common";

export default async function getUsageStatisticsByDataConsumer({ queryKey }) {
    const [_, params] = queryKey;

    // Getting the statistics for a single user from backend
    const { data } = await apiClient.get(
      `api/usage/bloomberg/statistics/data-consumer/`,
      {params: params}
    )

    // Returning the data
    return data; 
}