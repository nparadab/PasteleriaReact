import { useState, useEffect } from 'react';
import cliente from '../api/cliente';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [editando, setEditando] = useState(null);

  // Cargar productos y categorías al iniciar
  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await cliente.get('/api/productos');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const res = await cliente.get('/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al obtener categorías', error);
    }
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await cliente.put(`/api/productos/${editando}`, {
          nombre,
          precio,
          categoriaId
        });
      } else {
        await cliente.post('/api/productos', {
          nombre,
          precio,
          categoriaId
        });
      }
      setNombre('');
      setPrecio('');
      setCategoriaId('');
      setEditando(null);
      obtenerProductos();
    } catch (error) {
      console.error('Error al guardar producto', error);
    }
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCategoriaId(producto.categoriaId);
    setEditando(producto.id);
  };

  const eliminarProducto = async (id) => {
    try {
      await cliente.delete(`/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  return (
    <div className="productos-container">
      <h2>Gestión de Productos</h2>

      <form onSubmit={guardarProducto} className="form-producto">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <ul className="lista-productos">
        {productos.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> - ${p.precio}{' '}
            ({p.categoria?.nombre || 'Sin categoría'})
            <button onClick={() => editarProducto(p)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
