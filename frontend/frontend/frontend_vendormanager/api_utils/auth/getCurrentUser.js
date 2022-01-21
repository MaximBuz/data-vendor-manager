import apiClient from "../http-common";

export default async function getCurrentUser({ queryKey }) {
    const { data } = await apiClient.get(`auth/user/`)
    return data; 
}