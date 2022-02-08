import apiClient from "../../http-common";

export default async function postBbgAccountNr(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/bloomberg-accounts/`, formData.values)
    return data; 
}