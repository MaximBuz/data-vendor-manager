import apiClient from "../http-common";

export default async function getEntityTypes(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`organizational-entities/`, formData.values)
    return data; 
}