import apiClient from "../http-common";

export default async function getBBGuuids({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-uuids/?depth=${depth}`)
    return data; 
}