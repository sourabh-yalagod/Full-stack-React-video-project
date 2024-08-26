import axios from "axios";
import Cookies from "js-cookie";

// Log the environment variable to ensure it's set correctly
console.log(import.meta.env.VITE_BASE_URL);

const token = Cookies.get('token')
console.log(token);

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL || 'https://videotube-auro.onrender.com',
  baseURL:'http://localhost:8000',
  headers:{
    Authorization: `Bearer ${token}`
  },
  // baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default axiosInstance;
