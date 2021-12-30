import apiClient from "../../http-common";

export default async function postBBGSubscription(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`bloomberg-subscriptions/`, formData.values)
    return data; 
}