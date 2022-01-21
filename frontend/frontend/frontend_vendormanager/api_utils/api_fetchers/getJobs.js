import apiClient from "../http-common";

export default async function getJobs({ queryKey }) {
    const { data } = await apiClient.get(`api/jobs/`)
    return data; 
}