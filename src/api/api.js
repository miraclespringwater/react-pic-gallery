import axios from "axios";

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID YypZGr160MUUwWL7RyvcZx_-2lSJ2uwx3WC5aSDOz3E",
  },
});

export default api;
