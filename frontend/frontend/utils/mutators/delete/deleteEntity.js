import apiClient from "../../http-common";

export default async function deleteEntity(id) {
    const { data } = await apiClient.delete(`api/organizational-entities/${id}/`)
    return data; 
}