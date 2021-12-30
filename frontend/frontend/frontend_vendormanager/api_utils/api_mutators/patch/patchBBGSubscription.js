import apiClient from "../../http-common";

export default async function patchBBGSubscription(props) {
    const id = props.id;
    const values = props.values;
    console.log(values)
    const { data } = await apiClient.patch(`bloomberg-subscriptions/${id}/`, values)
    return data; 
}