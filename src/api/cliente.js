import axios from 'axios';

const cliente = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Enviar token en todas las rutas protegidas, excepto login y register
cliente.interceptors.request.use(config => {
  const esRutaPublica =
    config.url.includes('/api/auth/login') || config.url.includes('/api/auth/register');

  if (!esRutaPublica) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default cliente;
