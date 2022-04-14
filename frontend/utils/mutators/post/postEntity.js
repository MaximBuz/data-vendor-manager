import apiClient from "../../http-common";

export default async function postEntity(formData) {
    
    const { data } = await apiClient.post(`api/organizational-entities/`, formData.values)
    return data; 
}