import apiClient from "../../http-common";

export default async function getEntityTypes(formData) {
    
    const { data } = await apiClient.post(`api/organizational-entity-types/`, formData.values)
    return data; 
}