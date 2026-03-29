const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') 
  : '/api';

console.log("Current API_BASE is:", API_BASE); // Temporary debug

export default API_BASE;
