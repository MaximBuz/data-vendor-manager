import apiClient from "../../http-common";

export default async function postBBGFirmNr(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`bloomberg-firms/`, formData.values)
    return data; 
}