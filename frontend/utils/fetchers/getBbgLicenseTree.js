import apiClient from "../http-common";

export default async function getBbgLicenseTree({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`api/bloomberg-license-tree/?depth=${depth}`)
    return data; 
}