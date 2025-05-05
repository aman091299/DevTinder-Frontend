// // lib/api.js
// import axios from "axios";
// import { BASE_URL } from "./constant";
// const api = axios.create({
//   baseURL:BASE_URL,
// });

// // Intercept requests to add token from localStorage
// api.interceptors.request.use((config) => {
//     console.log("inside api intercetors request")
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });


export default api;