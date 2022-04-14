import axios from "axios";

export const endpoint = "https://vendor-backend-prod.herokuapp.com/";

const httpCommon =  axios.create({
  baseURL: endpoint,
  headers: {
      "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  }
});

// intercept every request with authentication
httpCommon.interceptors.request.use((config) => {
  // Read token from localStorage
  const token = localStorage.getItem("authenticationToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


// intercept every response to provide custom message on different status codes
httpCommon.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status == 403) {
    return Promise.reject("Insufficient permissions, please contact the responsible administrative staff to provide you with new permissions")
  } else if (error.response.status == 401) {
    return Promise.reject("Request could not be authenticated. Please login to use access this functionality")
  }
  return Promise.reject(error);
});


/* For serverside rendering there has to be a solution with cookies, cause server does not have access to localStorage */


export default httpCommon;