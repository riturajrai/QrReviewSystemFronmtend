import axios from "axios";

const instance = axios.create({
  baseURL: "https://qrreviewbackend.onrender.com/api",
  withCredentials: true, // IMPORTANT for cookies
});

export default instance;
