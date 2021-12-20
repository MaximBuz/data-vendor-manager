import apiClient from "../http-common";

export default async function patchEntity(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`organizational-entities/${id}/`, values)
    return data; 
}