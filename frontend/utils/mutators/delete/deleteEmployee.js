import apiClient from "../../http-common";

export default async function deleteEmployee(id) {
    const { data } = await apiClient.delete(`api/data-consumers/${id}/`)
    return data; 
}