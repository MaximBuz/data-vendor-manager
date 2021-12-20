import apiClient from "../http-common";

export default async function postLocation(formData) {
    console.log(formData)
    const { data } = await apiClient.post(`business-locations/`, formData)
    return "data"; 
}