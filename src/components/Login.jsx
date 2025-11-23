import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import cliente from '../api/cliente';

const Login = ({ setUsuario, setEsAdmin }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (correo.trim() === '' || clave.trim() === '') {
      setError(true);
      return;
    }

    try {
      const respuesta = await cliente.post('/api/auth/login', {
        email: correo,
        password: clave
      });

      const token = respuesta.data.token;
      localStorage.setItem('token', token);

      // Extraer datos del token
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsuario(payload.sub);
      setEsAdmin(payload.rol === 'ADMIN');

      setError(false);
      navigate(payload.rol === 'ADMIN' ? '/admin' : '/');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="tituloPastel">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="campo-login">
          <input
            type="email"
            className="input-login"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="campo-login">
          <input
            type="password"
            className="input-login"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        {error && (
          <motion.p
            className="error-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Usuario o contraseña incorrectos
          </motion.p>
        )}

        <button type="submit" className="boton-catalogo">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
