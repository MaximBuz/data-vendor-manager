import apiClient from "../../http-common";

export default async function patchBBGAccountNr(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`api/bloomberg-accounts/${id}/`, values)
    return data; 
}