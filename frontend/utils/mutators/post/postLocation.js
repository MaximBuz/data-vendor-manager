import apiClient from "../../http-common";

export default async function postLocation(formData) {
    
    const { data } = await apiClient.post(`api/business-locations/`, formData.values)
    return "data"; 
}