import apiClient from "../http-common";

export default async function getEntityTypes(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`organizational-entities/${id}/`, values)
    return data; 
}