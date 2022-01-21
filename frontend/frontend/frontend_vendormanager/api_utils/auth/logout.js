import apiClient from "../http-common";

export default async function logout() {
    
    // Get authentication token from backend
    const { data } = await apiClient.post(`auth/logout/`)

    // Save Token in local storage
    localStorage.removeItem('authenticationToken');

    return data;
}