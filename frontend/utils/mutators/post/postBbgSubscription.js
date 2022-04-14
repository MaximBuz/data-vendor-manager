import apiClient from "../../http-common";

export default async function postBbgSubscription(formData) {
    
    const { data } = await apiClient.post(`api/bloomberg-subscriptions/`, formData.values)
    return data; 
}