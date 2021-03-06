import apiClient from "../http-common";

export default async function getBbgSubscriptions({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-subscriptions/?depth=${depth}`)
    return data; 
}