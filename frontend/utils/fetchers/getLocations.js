import apiClient from "../http-common";

export default async function getLocations({ queryKey }) {
    const { data } = await apiClient.get(`api/business-locations/`)
    return data; 
}