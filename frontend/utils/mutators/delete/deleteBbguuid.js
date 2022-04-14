import apiClient from "../../http-common";

export default async function deleteBbguuid(id) {
    const { data } = await apiClient.delete(`api/bloomberg-uuids/${id}/`)
    return data; 
}