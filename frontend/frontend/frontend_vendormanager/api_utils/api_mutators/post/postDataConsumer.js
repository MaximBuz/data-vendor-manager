import apiClient from "../../http-common";

export default async function postDataConsumer(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`data-consumers/`, formData.values)
    return data; 
}