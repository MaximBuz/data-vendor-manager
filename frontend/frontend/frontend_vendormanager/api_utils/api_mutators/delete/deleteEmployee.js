import apiClient from "../../http-common";

export default async function deleteEmployee(id) {
    const { data } = await apiClient.delete(`data-consumers/${id}/`)
    return data; 
}