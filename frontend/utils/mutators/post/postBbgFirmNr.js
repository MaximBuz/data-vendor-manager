import apiClient from "../../http-common";

export default async function postBbgFirmNr(formData) {
    
    const { data } = await apiClient.post(`api/bloomberg-firms/`, formData.values)
    return data; 
}