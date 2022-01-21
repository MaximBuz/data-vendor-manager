import apiClient from "../http-common";

export default async function getOrganizationalEntityRootChildren({ queryKey }) {
    const [_, id, depth] = queryKey;
    const { data } = await apiClient.get(`api/organizational-entities/${id}/?depth=${depth}`)
    return data; 
}