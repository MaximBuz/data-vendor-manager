import apiClient from "../http-common";

export default async function getDataConsumers({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`data-consumers/?depth=${depth}`)
    return data; 
}