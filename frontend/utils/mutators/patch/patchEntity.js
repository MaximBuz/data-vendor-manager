import apiClient from "../../http-common";

export default async function patchEntity(props) {
    const id = props.id;
    const values = props.values;
    
    const { data } = await apiClient.patch(`api/organizational-entities/${id}/`, values)
    return data; 
}