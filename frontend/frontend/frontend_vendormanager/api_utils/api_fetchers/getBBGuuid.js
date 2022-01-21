import apiClient from "../http-common";

export default async function getBBGuuid({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-uuids/${id}/?depth=${depth}`)
    return data; 
}