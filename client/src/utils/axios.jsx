// client/src/utils/axios.js
import axios from "axios";
const token = localStorage.getItem("token");

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
