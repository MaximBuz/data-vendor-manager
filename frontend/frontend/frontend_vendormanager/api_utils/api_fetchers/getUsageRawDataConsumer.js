import apiClient from "../http-common";

export default async function getUsageRawDataconsumer({ queryKey }) {
    const [_, id] = queryKey;

    // Getting the aggregated statistics from backend
    const { data } = await apiClient.get(
      `usage/bloomberg/raw/dataconsumer/${id}/`,
    )

    // Returning the data
    return data; 
}