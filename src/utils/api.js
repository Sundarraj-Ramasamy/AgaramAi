// src/utils/api.js
// Provides the base API URL for all server requests.
// In development: Vite proxies /api/* to localhost:5000
// In production: uses VITE_API_URL environment variable (e.g. https://agaramai.onrender.com)

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') // remove trailing slash if any
  : '/api';

export default API_BASE;
