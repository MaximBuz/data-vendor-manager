import apiClient from "../../http-common";

export default async function deleteBBGAccountNr(id) {
    const { data } = await apiClient.delete(`api/bloomberg-accounts/${id}/`)
    return data; 
}