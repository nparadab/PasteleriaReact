import axios from 'axios';

const cliente = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ No enviar token en rutas públicas (register y login)
cliente.interceptors.request.use(config => {
  if (!config.url.includes('/api/auth')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default cliente;
