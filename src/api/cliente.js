import axios from 'axios';

const cliente = axios.create({
  baseURL: 'https://milsabores-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para token
cliente.interceptors.request.use(config => {
  const url = (config.url || '').toLowerCase();

  // Rutas públicas reales del backend
  const esRutaPublica =
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/recuperar');

  if (!esRutaPublica) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, error => Promise.reject(error));

export default cliente;
