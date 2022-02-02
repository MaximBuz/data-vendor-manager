import apiClient from "../http-common";

export default async function getOrganizationalEntity({ queryKey }) {
    const [_, id, depth] = queryKey;
    console.log("in axios func getOrganizationalEntity");
    const { data } = await apiClient.get(`api/organizational-entities/${id}/?depth=${depth}`)
    console.log(data);
    return data; 
}