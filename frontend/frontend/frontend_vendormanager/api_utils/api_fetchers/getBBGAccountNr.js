import apiClient from "../http-common";

export default async function getBBGAccountNr({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-accounts/${id}/?depth=${depth}`)
    return data; 
}