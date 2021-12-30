import apiClient from "../../http-common";

export default async function deleteBBGSubscription(id) {
    const { data } = await apiClient.delete(`bloomberg-subscriptions/${id}/`)
    return data; 
}