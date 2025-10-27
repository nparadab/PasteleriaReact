import React from 'react';
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

const Admin = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2 className="logo">Panel Admin</h2>
        <nav>
          <ul>
            <li><FaChartBar /> Dashboard</li>
            <li><FaClipboardList /> Órdenes</li>
            <li><FaBoxOpen /> Productos</li>
            <li><FaTags /> Categorías</li>
            <li><FaUsers /> Usuarios</li>
            <li><FaChartBar /> Reportes</li>
            <li><FaUserCircle /> Perfil</li>
            <li><FaStore /> Tienda</li>
            <li className="logout"><FaSignOutAlt /> Cerrar Sesión</li>
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
          <div className="tile"><FaChartBar /> Dashboard</div>
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
