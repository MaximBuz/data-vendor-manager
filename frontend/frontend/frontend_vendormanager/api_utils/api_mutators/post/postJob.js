import apiClient from "../../http-common";

export default async function postJob(formData) {
    console.log(formData.values)
    const { data } = await apiClient.post(`api/jobs/`, formData.values)
    return data; 
}