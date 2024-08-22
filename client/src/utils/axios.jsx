// client/src/utils/axios.js
import axios from "axios";
const token = localStorage.getItem("token");

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-api-1rx3.onrender.com/api", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
