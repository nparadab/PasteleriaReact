import { useState, useEffect } from 'react';
import cliente from '../api/cliente';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('CLIENTE');
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await cliente.get('/api/auth/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await cliente.put(`/api/auth/usuarios/${editandoId}`, {
          nombre,
          email,
          rol
        });
      } else {
        await cliente.post('/api/auth/register', {
          nombre,
          email,
          password,
          rol
        });
      }
      setNombre('');
      setEmail('');
      setPassword('');
      setRol('CLIENTE');
      setEditandoId(null);
      setMostrarFormulario(false);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario', error);
    }
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setRol(usuario.rol);
    setEditandoId(usuario.id);
    setMostrarFormulario(true);
  };

  const eliminarUsuario = async (id) => {
    try {
      await cliente.delete(`/api/auth/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  return (
    <div className="container">
      <h2 className="tituloPastel">Gestión de Usuarios</h2>

      <table className="tablaPedidos">
        <thead>
          <tr>
            <th>✔</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td><input type="checkbox" /></td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => editarUsuario(u)} className="boton-catalogo">Editar</button>
                <button onClick={() => eliminarUsuario(u.id)} className="boton-catalogo">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setEditandoId(null);
            setNombre('');
            setEmail('');
            setPassword('');
            setRol('CLIENTE');
          }}
          className="boton-catalogo"
        >
          {mostrarFormulario ? 'Cerrar formulario' : 'Agregar usuario'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setMostrarFormulario(false)}>×</span>
            <form onSubmit={guardarUsuario} className="form-login">
              <div className="campo-registro">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="input-registro"
                />
              </div>
              <div className="campo-registro">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-registro"
                />
              </div>
              {!editandoId && (
                <div className="campo-registro">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-registro"
                  />
                </div>
              )}
              <div className="campo-registro">
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="input-registro"
                >
                  <option value="CLIENTE">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <button type="submit" className="boton-catalogo">
                {editandoId ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
