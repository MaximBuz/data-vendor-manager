import apiClient from "../../http-common";

export default async function deleteBBGuuid(id) {
    const { data } = await apiClient.delete(`bloomberg-uuids/${id}/`)
    return data; 
}