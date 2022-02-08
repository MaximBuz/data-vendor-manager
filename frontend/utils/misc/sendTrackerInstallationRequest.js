import apiClient from "../http-common";

export default async function sendTrackerInstallationRequest({ uuidId}) {
    const { data } = await apiClient.get(`api/cost-manager/usage-tracker-download-mail/${uuidId}/`)
    return data; 
}