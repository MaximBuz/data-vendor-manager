import apiClient from "../http-common";

export default async function getBbgFirmNr({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-firms/${id}/?depth=${depth}`)
    return data; 
}