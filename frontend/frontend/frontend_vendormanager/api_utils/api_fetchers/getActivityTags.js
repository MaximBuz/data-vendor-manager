import apiClient from "../http-common";

export default async function getActivityTags({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`activity-tags/?depth=${depth}`)
    return data; 
}