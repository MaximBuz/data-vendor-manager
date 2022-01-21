import apiClient from "../../http-common";

export default async function getEntityTypes(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/organizational-entity-types/`, formData.values)
    return data; 
}