import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import {
  FaChartBar,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaClipboardList,
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
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2 className="logo">Panel Admin</h2>
        <nav>
          <ul>
            <li><Link to="/admin"><FaChartBar /> Dashboard</Link></li>
            <li><Link to="/pedidos"><FaClipboardList /> Órdenes</Link></li>
            <li><Link to="/productos"><FaBoxOpen /> Productos</Link></li>
            <li><Link to="/categorias"><FaTags /> Categorías</Link></li>
            <li><Link to="/usuarios"><FaUsers /> Usuarios</Link></li>
            <li><Link to="/reportes"><FaChartBar /> Reportes</Link></li>
            <li><Link to="/perfil"><FaUserCircle /> Perfil</Link></li>
            <li><Link to="/"><FaStore /> Tienda</Link></li>
            <li className="logout" onClick={cerrarSesion}>
              <FaSignOutAlt /> Cerrar Sesión
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard">
        <section className="summary-images">
          <div className="summary-item">
            <img src="/imagenes/compras.png" alt="Compras" className="summary-img" />
            <p className="summary-label">Compras</p>
          </div>
          <div className="summary-item">
            <img src="/imagenes/productos.png" alt="Productos" className="summary-img" />
            <p className="summary-label">Productos</p>
          </div>
          <div className="summary-item">
            <img src="/imagenes/usuarios.png" alt="Usuarios" className="summary-img" />
            <p className="summary-label">Usuarios</p>
          </div>
          <div className="summary-item">
            <img src="/imagenes/ventas.png" alt="Ventas" className="summary-img" />
            <p className="summary-label">Ventas</p>
          </div>
        </section>

        <section className="tiles">
          <div className="tile"><FaClipboardList /> Órdenes</div>
          <div className="tile"><FaBoxOpen /> Productos</div>
          <div className="tile"><FaTags /> Categorías</div>
          <div className="tile"><FaUsers /> Usuarios</div>
          <div className="tile"><FaChartBar /> Reportes</div>
          <div className="tile"><FaUserCircle /> Perfil</div>
          <div className="tile"><FaStore /> Tienda</div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
