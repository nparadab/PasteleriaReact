import { useState, useEffect } from 'react';
import cliente from '../api/cliente';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('CLIENTE');
  const [editando, setEditando] = useState(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await cliente.get('/api/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await cliente.put(`/api/usuarios/${editando}`, {
          nombre,
          email,
          rol
        });
      } else {
        await cliente.post('/api/usuarios', {
          nombre,
          email,
          rol
        });
      }
      setNombre('');
      setEmail('');
      setRol('CLIENTE');
      setEditando(null);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario', error);
    }
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setRol(usuario.rol);
    setEditando(usuario.id);
  };

  const eliminarUsuario = async (id) => {
    try {
      await cliente.delete(`/api/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>

      <form onSubmit={guardarUsuario} className="form-usuario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="CLIENTE">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <ul className="lista-usuarios">
        {usuarios.map((u) => (
          <li key={u.id}>
            <strong>{u.nombre}</strong> - {u.email} ({u.rol})
            <button onClick={() => editarUsuario(u)}>Editar</button>
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
