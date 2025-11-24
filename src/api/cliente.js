import axios from 'axios';

const cliente = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://milsabores-api.onrender.com',
});

// ✅ Interceptor para enviar token en todas las rutas protegidas
cliente.interceptors.request.use(config => {
  const url = (config.url || '').toLowerCase();

  // Detectar rutas públicas (login y register)
  const esRutaPublica =
    url.includes('/login') || url.includes('/register');

  if (!esRutaPublica) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      console.log('🔐 Enviando token en header:', config.headers.Authorization); // 👀 para confirmar
    } else {
      console.warn('⚠️ No hay token en localStorage');
    }
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default cliente;
