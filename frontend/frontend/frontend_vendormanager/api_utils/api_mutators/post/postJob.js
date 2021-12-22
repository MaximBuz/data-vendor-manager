import apiClient from "../../http-common";

export default async function postJob(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`jobs/`, formData.values)
    return data; 
}