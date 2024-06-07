import axios from "axios";

const client = axios.create({
  // baseURL: "https://movie-box-backend-p41im9m2e-nandinee-patels-projects.vercel.app/api",
  baseURL: "http://localhost:8000/api",
});

export default client;
