import apiClient from "../../http-common";

export default async function patchBbgSubscription(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`api/bloomberg-subscriptions/${id}/`, values)
    return data; 
}