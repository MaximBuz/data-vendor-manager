import apiClient from "../../http-common";

export default async function postLocation(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`business-locations/`, formData.values)
    return "data"; 
}