import apiClient from "../../http-common";

export default async function deleteBbgSubscription(id) {
    const { data } = await apiClient.delete(`api/bloomberg-subscriptions/${id}/`)
    return data; 
}