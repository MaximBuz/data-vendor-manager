import apiClient from "../../http-common";

export default async function patchBBGFirmNr(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`bloomberg-firms/${id}/`, values)
    return data; 
}