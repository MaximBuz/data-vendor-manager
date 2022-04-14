import apiClient from "../http-common";

export default async function getBbgFirmNrs({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-firms/?depth=${depth}`)
    return data; 
}