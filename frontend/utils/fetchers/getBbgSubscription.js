import apiClient from "../http-common";

export default async function getBbgSubscription({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-subscriptions/${id}/?depth=${depth}`)
    return data; 
}