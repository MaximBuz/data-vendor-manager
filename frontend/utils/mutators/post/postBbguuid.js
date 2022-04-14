import apiClient from "../../http-common";

export default async function postBbguuid(formData) {
    
    const { data } = await apiClient.post(`api/bloomberg-uuids/`, formData.values)
    return data; 
}