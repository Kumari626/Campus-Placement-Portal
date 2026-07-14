import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-placement-portal-backend.onrender.com",
});

// const api = axios.create({ 
//   baseURL: 'http://localhost:5000', // Replace 5000 with your actual backend port
// });


export default api;