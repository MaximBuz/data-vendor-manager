import apiClient from "../../http-common";

export default async function postDataConsumer(formData) {
    
    const { data } = await apiClient.post(`api/data-consumers/`, formData.values)
    return data; 
}