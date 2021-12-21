import apiClient from "../http-common";

export default async function getDataConsumer({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`data-consumers/${id}/?depth=${depth}`)
    return data; 
}