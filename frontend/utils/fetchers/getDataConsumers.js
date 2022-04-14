import apiClient from "../http-common";

export default async function getDataConsumers({ queryKey }) {
    const [_, depth, location] = queryKey;
    const { data } = await apiClient.get(`api/data-consumers/?depth=${depth ? depth : 0}&location=${location ? location : 0}`)
    return data; 
}