import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  // Asegúrate de que el objeto user sea válido y luego accede al token
  if (user) {
    const parsedUser = JSON.parse(user); // Parseamos el objeto user
    config.headers.Authorization = `Bearer ${parsedUser.token}`; // Usamos el token
  }
  return config;
});

export default api;
