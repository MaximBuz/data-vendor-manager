import apiClient from "../../http-common";

export default async function postBBGAccountNr(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/bloomberg-accounts/`, formData.values)
    return data; 
}