import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-placement-portal-backend.onrender.com",
});

export default api;