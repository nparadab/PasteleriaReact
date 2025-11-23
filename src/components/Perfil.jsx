import { useState, useEffect } from 'react';
import cliente from '../api/cliente';
import '../styles/style.css';

const Perfil = ({ usuario }) => {
  const [perfil, setPerfil] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!usuario) return;
    obtenerPerfil();
  }, [usuario]);

  const obtenerPerfil = async () => {
    try {
      const res = await cliente.get('/api/usuarios/perfil');
      setPerfil(res.data);
      setNombre(res.data.nombre);
      setEmail(res.data.email);
      setNacimiento(res.data.nacimiento || '');
    } catch (error) {
      console.error('Error al obtener perfil', error);
    }
  };

  const actualizarPerfil = async (e) => {
    e.preventDefault();
    try {
      await cliente.put('/api/usuarios/perfil', {
        nombre,
        email,
        nacimiento
      });
      setMensaje('Perfil actualizado correctamente ✅');
      obtenerPerfil();
    } catch (error) {
      console.error('Error al actualizar perfil', error);
      setMensaje('Hubo un error al actualizar el perfil ❌');
    }
  };

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>

      {perfil ? (
        <form onSubmit={actualizarPerfil} className="form-perfil">
          <div className="campo-perfil">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="campo-perfil">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="campo-perfil">
            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              value={nacimiento}
              onChange={(e) => setNacimiento(e.target.value)}
            />
          </div>

          <button type="submit" className="boton-catalogo">Actualizar</button>
        </form>
      ) : (
        <p>Cargando perfil...</p>
      )}

      {mensaje && <p className="mensaje-perfil">{mensaje}</p>}
    </div>
  );
};

export default Perfil;
