import apiClient from "../http-common";

export default async function getBBGSubscriptions({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-subscriptions/?depth=${depth}`)
    return data; 
}