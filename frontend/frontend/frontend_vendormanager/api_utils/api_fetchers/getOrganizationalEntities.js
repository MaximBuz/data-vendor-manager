import apiClient from "../http-common";

export default async function getOrganizationalEntities({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`organizational-entities/?depth=${depth}`)
    return data; 
}