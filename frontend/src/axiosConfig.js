// import axios from 'axios';

// axios.defaults.baseURL =
//   process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';

import axios from "axios";

//  Base URL for backend
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "/";

//  Automatically attach token to every request
axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.access_token = user.token; // matches backend's auth.mid.js
  }
  return config;
});

export default axios;
