import apiClient from "../http-common";

export default async function postEntity(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`organizational-entities/`, formData.values)
    return data; 
}