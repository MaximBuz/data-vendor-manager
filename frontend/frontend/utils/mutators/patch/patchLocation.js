import apiClient from "../../http-common";

export default async function patchLocation(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`api/business-locations/${id}/`, values)
    return data; 
}