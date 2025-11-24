import { Navigate } from 'react-router-dom';

export default function RutaPrivada({ children, rol }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Puede venir como 'rol', 'role' o dentro de 'authorities'
    let rolUsuario = payload.rol || payload.role || (payload.authorities && payload.authorities[0]);

    if (rolUsuario) {
      // Normalizar: quitar prefijo ROLE_ si existe
      rolUsuario = rolUsuario.replace('ROLE_', '');
    }

    if (rol && rolUsuario !== rol) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error('Error al decodificar token', error);
    return <Navigate to="/login" />;
  }
}
