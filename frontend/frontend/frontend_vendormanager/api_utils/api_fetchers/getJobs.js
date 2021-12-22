import apiClient from "../http-common";

export default async function getJobs({ queryKey }) {
    const { data } = await apiClient.get(`jobs/`)
    return data; 
}