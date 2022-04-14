import apiClient from "../../http-common";

export default async function patchBbgFirmNr(props) {
    const id = props.id;
    const values = props.values;
    const { data } = await apiClient.patch(`api/bloomberg-firms/${id}/`, values)
    return data; 
}