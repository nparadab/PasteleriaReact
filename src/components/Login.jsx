import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ setUsuario, setEsAdmin }) => {
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación personalizada
    if (nombre.trim() === '' || clave.trim() === '') {
      setError(true);
      return;
    }

    setUsuario(nombre);

    if (nombre.toLowerCase() === 'admin' && clave === '12345') {
      setEsAdmin(true);
      setError(false);
      navigate('/admin');
    } else if (nombre.toLowerCase() !== 'admin') {
      setEsAdmin(false);
      setError(false);
      navigate('/');
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="tituloPastel">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="campo-login">
          <input
            type="text"
            className="input-login"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
