import apiClient from "../http-common";

export default async function getLocationWithBuildings({ queryKey }) {
    const [_, id] = queryKey;
    const { data } = await apiClient.get(`business-locations/${id}/`)
    return data; 
}