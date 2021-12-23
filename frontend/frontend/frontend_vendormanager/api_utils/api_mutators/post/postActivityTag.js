import apiClient from "../../http-common";

export default async function postActivityTag(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`activity-tags/`, formData.values)
    return data; 
}