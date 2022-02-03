import apiClient from "../../http-common";

export default async function postBbguuid(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/bloomberg-uuids/`, formData.values)
    return data; 
}