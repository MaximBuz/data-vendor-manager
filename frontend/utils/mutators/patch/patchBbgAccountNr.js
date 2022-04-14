import apiClient from "../../http-common";

export default async function patchBbgAccountNr(props) {
    const id = props.id;
    const values = props.values;
    const { data } = await apiClient.patch(`api/bloomberg-accounts/${id}/`, values)
    return data; 
}