import apiClient from "../../http-common";

export default async function postBBGFirmNr(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/bloomberg-firms/`, formData.values)
    return data; 
}