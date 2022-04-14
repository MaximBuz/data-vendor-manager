import apiClient from "../../http-common";

export default async function deleteBbgAccountNr(id) {
    const { data } = await apiClient.delete(`api/bloomberg-accounts/${id}/`)
    return data; 
}