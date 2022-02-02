import apiClient from "../../http-common";

export default async function deleteBBGFirmNr(id) {
    const { data } = await apiClient.delete(`api/bloomberg-firms/${id}/`)
    return data; 
}