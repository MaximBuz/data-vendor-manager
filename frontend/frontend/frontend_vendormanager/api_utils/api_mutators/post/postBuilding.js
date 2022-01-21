import apiClient from "../../http-common";

export default async function postBuilding(formData) {
    formData.values["building_location"] = formData.building_location
    const { data } = await apiClient.post(`api/buildings/`, formData.values)
    return data; 
}