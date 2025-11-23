import { useState, useEffect } from 'react';
import cliente from '../api/cliente';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(null);

  // Cargar categorías al iniciar
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const res = await cliente.get('/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías', error);
    }
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await cliente.put(`/api/categorias/${editando}`, {
          nombre,
          descripcion
        });
      } else {
        await cliente.post('/api/categorias', {
          nombre,
          descripcion
        });
      }
      setNombre('');
      setDescripcion('');
      setEditando(null);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al guardar categoría', error);
    }
  };

  const editarCategoria = (categoria) => {
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
    setEditando(categoria.id);
  };

  const eliminarCategoria = async (id) => {
    try {
      await cliente.delete(`/api/categorias/${id}`);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  return (
    <div className="categorias-container">
      <h2>Gestión de Categorías</h2>

      <form onSubmit={guardarCategoria} className="form-categoria">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <ul className="lista-categorias">
        {categorias.map((c) => (
          <li key={c.id}>
            <strong>{c.nombre}</strong> - {c.descripcion}
            <button onClick={() => editarCategoria(c)}>Editar</button>
            <button onClick={() => eliminarCategoria(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
