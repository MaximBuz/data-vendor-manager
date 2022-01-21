import apiClient from "../http-common";

export default async function getEntityTypes({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/organizational-entity-types/?depth=${depth}`)
    return data; 
}