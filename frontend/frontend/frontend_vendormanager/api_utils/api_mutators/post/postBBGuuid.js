import apiClient from "../../http-common";

export default async function postBBGuuid(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`bloomberg-uuids/`, formData.values)
    return data; 
}