import apiClient from "../http-common";

export default async function getBbgAccountNr({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-accounts/${id}/?depth=${depth}`)
    return data; 
}