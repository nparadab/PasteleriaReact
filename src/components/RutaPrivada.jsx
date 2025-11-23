import { Navigate } from 'react-router-dom';

export default function RutaPrivada({ children, rol }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodificar el token para verificar rol
  const payload = JSON.parse(atob(token.split('.')[1]));
  const rolUsuario = payload.rol;

  if (rol && rolUsuario !== rol) {
    return <Navigate to="/" />;
  }

  return children;
}
