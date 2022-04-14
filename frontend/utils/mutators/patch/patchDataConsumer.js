import apiClient from "../../http-common";

export default async function patchDataConsumer(props) {
    const id = props.id;
    const values = props.values;
    const { data } = await apiClient.patch(`api/data-consumers/${id}/`, values)
    return data; 
}