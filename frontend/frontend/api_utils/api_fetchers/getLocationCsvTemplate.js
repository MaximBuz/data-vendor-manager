import apiClient from "../http-common";

export default async function getLocationCsvTemplate() {
    const file = await apiClient.get(`api/business-locations/template/`, {responseType: "blob"})
    const url = window.URL.createObjectURL(new Blob([file.data]));
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "location_template.csv")
    document.body.appendChild(link)
    link.click();
    return file; 
}