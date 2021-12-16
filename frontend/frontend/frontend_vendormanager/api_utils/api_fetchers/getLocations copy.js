import apiClient from "../http-common";

export default async function getLocationWithBuilding({ queryKey }) {
    
    const { data } = await apiClient.get(`business-locations/`)
    return data; 
}