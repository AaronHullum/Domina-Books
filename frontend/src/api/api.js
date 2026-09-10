import axios from "axios";

const api = axios.create({
  baseURL: "https://dominabooks-api.onrender.com/api"
});

export default api;