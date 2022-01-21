import apiClient from "../../http-common";

export default async function deleteBuilding(id) {
    const { data } = await apiClient.delete(`api/buildings/${id}/`)
    return data; 
}