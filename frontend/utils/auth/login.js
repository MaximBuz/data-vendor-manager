import apiClient from "../http-common";

export default async function login(formData) {
    
    // Get authentication token from backend
    const { data } = await apiClient.post(`auth/login/`, formData)

    // Save Token in local storage
    localStorage.setItem('authenticationToken', data.key);

    return data;
}