import apiClient from "../../http-common";

export default async function deleteBBGAccountNr(id) {
    const { data } = await apiClient.delete(`bloomberg-accounts/${id}/`)
    return data; 
}