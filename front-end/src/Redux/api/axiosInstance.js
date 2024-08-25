import axios from "axios";

// Log the environment variable to ensure it's set correctly
console.log(import.meta.env.VITE_BASE_URL);

// Use the environment variable for the base URL
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL || 'https://videotube-auro.onrender.com',
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default axiosInstance;
