import apiClient from "../http-common";

export default async function getOrganizationalEntityRootChildren({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/organizational-entities-root-children/?depth=${depth}`)
    return data; 
}