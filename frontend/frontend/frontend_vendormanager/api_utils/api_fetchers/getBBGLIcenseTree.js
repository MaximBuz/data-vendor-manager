import apiClient from "../http-common";

export default async function getBBGLicenseTree({ queryKey }) {
    const [_, depth] = queryKey;
    const { data } = await apiClient.get(`bloomberg-license-tree/?depth=${depth}`)
    return data; 
}