import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://videotube-auro.onrender.com", // your backend URL
  timeout: 10000, // optional: set a timeout for requests
});

export default axiosInstance;
