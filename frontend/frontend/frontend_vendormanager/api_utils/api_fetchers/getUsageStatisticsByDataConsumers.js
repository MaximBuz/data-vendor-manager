import apiClient from "../http-common";

export default async function getUsageStatisticsByDataConsumers({ queryKey }) {
    const [_, params] = queryKey;

    // Getting the aggregated statistics from backend
    const { data } = await apiClient.get(
      `api/usage/bloomberg/statistics/data-consumers/`,
      {params: params}
    )

    // Returning the data
    return data; 
}