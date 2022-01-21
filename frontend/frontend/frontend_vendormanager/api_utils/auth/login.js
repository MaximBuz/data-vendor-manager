import { endpoint } from "../http-common";
import axios from "axios";

export default async function login(formData) {
    
    // Get authentication token from backend
    const { data, success } = await axios({
      method: "post",
      baseURL: endpoint + "/auth/login/",
      data: formData
    })

    // Save Token in local storage
    success && localStorage.setItem('authenticationToken', JSON.stringify(data));

    return data;
}