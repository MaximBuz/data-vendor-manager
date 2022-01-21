import apiClient from "../http-common";

export default async function getBBGSubscription({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-subscriptions/${id}/?depth=${depth}`)
    return data; 
}