import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewpilot-ai-2cmo.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;