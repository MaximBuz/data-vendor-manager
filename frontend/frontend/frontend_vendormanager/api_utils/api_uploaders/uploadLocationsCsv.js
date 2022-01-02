import apiClient from "../../http-common";

export default async function uploadLocationsCsv(formData) {
    console.log(formData)
    console.log(formData.values)
    // const { data } = await apiClient.post(`business-locations/upload/`, formData.values)
    return "data"; 
}