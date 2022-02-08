import apiClient from "../../http-common";

export default async function postActivityTag(formData) {
    
    const { data } = await apiClient.post(`api/activity-tags/`, formData.values)
    return data; 
}