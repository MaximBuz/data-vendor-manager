import apiClient from "../http-common";

export default async function getBBGFirmIds({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-firms/?depth=${depth}`)
    return data; 
}