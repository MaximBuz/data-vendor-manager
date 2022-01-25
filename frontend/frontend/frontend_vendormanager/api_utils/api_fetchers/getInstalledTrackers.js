import apiClient from "../http-common";

export default async function getInstalledTrackers({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/usage-trackers/${id}/?depth=${depth}`)
    return data; 
}