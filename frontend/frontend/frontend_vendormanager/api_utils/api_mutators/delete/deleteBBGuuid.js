import apiClient from "../../http-common";

export default async function deleteBBGuuid(id) {
    const { data } = await apiClient.delete(`api/bloomberg-uuids/${id}/`)
    return data; 
}