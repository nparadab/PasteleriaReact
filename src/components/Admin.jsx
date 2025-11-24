import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import {
  FaClipboardList,
  FaTags,
  FaUsers,
  FaChartBar,
  FaUserCircle,
  FaStore,
  FaSignOutAlt
} from 'react-icons/fa';

const Admin = ({ usuario, setUsuario, setEsAdmin }) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUsuario('');
    setEsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('pedidos');
    localStorage.removeItem('envios');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <main className="dashboard">
        <h2 className="tituloPastel">Panel de Administración</h2>
        {usuario && (
          <p className="admin-saludo">Bienvenido, <strong>{usuario}</strong></p>
        )}

        <section className="summary-images">
          <Link to="/pedidos" className="summary-item">
            <img src="/imagenes/compras.png" alt="Compras" className="summary-img" />
            <p className="summary-label">Compras</p>
          </Link>
          <Link to="/productos" className="summary-item">
            <img src="/imagenes/productos.png" alt="Productos" className="summary-img" />
            <p className="summary-label">Productos</p>
          </Link>
          <Link to="/usuarios" className="summary-item">
            <img src="/imagenes/usuarios.png" alt="Usuarios" className="summary-img" />
            <p className="summary-label">Usuarios</p>
          </Link>
          <Link to="/reportes" className="summary-item">
            <img src="/imagenes/ventas.png" alt="Ventas" className="summary-img" />
            <p className="summary-label">Ventas</p>
          </Link>
        </section>

        <section className="tiles">
          <Link to="/pedidos" className="tile"><FaClipboardList /> Órdenes</Link>
          <Link to="/categorias" className="tile"><FaTags /> Categorías</Link>
          <Link to="/usuarios" className="tile"><FaUsers /> Usuarios</Link>
          <Link to="/reportes" className="tile"><FaChartBar /> Reportes</Link>
          <Link to="/perfil" className="tile"><FaUserCircle /> Perfil</Link>
          <Link to="/" className="tile"><FaStore /> Tienda</Link>
          <div className="tile logout" onClick={cerrarSesion}>
            <FaSignOutAlt /> Cerrar Sesión
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
