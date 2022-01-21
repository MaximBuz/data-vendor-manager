import apiClient from "../../http-common";

export default async function patchBBGuuid(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`api/bloomberg-uuids/${id}/`, values)
    return data; 
}