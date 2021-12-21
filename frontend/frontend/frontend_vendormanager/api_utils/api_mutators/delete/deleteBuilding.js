import apiClient from "../../http-common";

export default async function deleteBuilding(id) {
    const { data } = await apiClient.delete(`buildings/${id}/`)
    return data; 
}