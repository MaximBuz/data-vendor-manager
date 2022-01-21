import axios from "axios";

export const endpoint = "http://localhost:8000/";

const httpCommon =  axios.create({
  baseURL: endpoint,
  headers: {
      "Content-Type": "application/json",
  }
});

// intercept every request with authentication
httpCommon.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = JSON.parse(localStorage.getItem("authenticationToken"));
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


/* For serverside rendering there has to be a solution with cookies, cause server does not have access to localStorage */


export default httpCommon;