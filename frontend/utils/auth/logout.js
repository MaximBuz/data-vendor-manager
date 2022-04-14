import apiClient from '../http-common';

export default async function logout() {
 // Delete token from local storage
 localStorage.removeItem('authenticationToken');

 // Get authentication token from backend
 const { data } = await apiClient.post(`auth/logout/`);

 return data;
}
