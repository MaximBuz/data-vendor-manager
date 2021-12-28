import apiClient from "../http-common";

export default async function getBBGFirmNr({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-firms/${id}/?depth=${depth}`)
    return data; 
}