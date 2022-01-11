import apiClient from "../http-common";

export default async function getAggregatedUsage({ queryKey }) {
    const [_, group_by, params] = queryKey;

    // Getting the aggregated data from backend
    const { data } = await apiClient.get(
      `usage/bloomberg/aggregated/${group_by}/`,
      {params: params}
    )

    // Returning the data
    return data; 
}