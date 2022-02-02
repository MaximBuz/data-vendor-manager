import apiClient from "../http-common";

export default async function getUsageRawDataconsumer({ queryKey }) {
    const [_, params] = queryKey;

    // Getting the aggregated statistics from backend
    const { data } = await apiClient.get(
      `api/usage/bloomberg/raw/dataconsumer/`,
      {params: params}
    )

    // Returning the data
    return data; 
}