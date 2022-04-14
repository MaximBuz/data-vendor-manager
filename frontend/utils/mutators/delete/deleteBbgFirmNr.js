import apiClient from "../../http-common";

export default async function deleteBbgFirmNr(id) {
    const { data } = await apiClient.delete(`api/bloomberg-firms/${id}/`)
    return data; 
}