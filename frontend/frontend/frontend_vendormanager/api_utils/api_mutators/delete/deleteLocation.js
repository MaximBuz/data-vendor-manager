import apiClient from "../../http-common";

export default async function deleteLocation(id) {
    const { data } = await apiClient.delete(`business-locations/${id}/`)
    return data; 
}