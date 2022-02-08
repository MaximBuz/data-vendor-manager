import apiClient from "../../http-common";

export default async function postBbgAccountNr(formData) {
    
    const { data } = await apiClient.post(`api/bloomberg-accounts/`, formData.values)
    return data; 
}