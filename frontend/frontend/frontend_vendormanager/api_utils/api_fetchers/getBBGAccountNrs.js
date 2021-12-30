import apiClient from "../http-common";

export default async function getBBGAccountNrs({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-accounts/?depth=${depth}`)
    return data; 
}