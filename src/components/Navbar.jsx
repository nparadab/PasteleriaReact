import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdBakeryDining } from 'react-icons/md';
import {
  FaShoppingCart,
  FaUserLock,
  FaUserPlus,
  FaGift,
  FaClipboardList,
  FaTruck,
  FaTools,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = ({ usuario, esAdmin, setUsuario, setEsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.ms-navbar');
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cerrarSesion = () => {
    setUsuario('');
    setEsAdmin(false);
    localStorage.removeItem('pedidos');
    localStorage.removeItem('envios');
    navigate('/');
  };

  return (
    <nav className="ms-navbar">
      <div className="ms-nav-inner">
        <Link to="/" className="ms-brand">
          <div className="ms-logo-wrapper">
            <img src="/imagenes/logo.png" alt="Logo" className="ms-logo" />
          </div>
          <span className="ms-brand-text">Mil Sabores</span>
        </Link>

        <div className="ms-nav-links">
          <Link to="/catalogo" className="ms-nav-link" style={{ '--i': 0 }}>
            <MdBakeryDining className="ms-icon" style={{ color: '#d16ba5' }} />
            <span>Catálogo</span>
          </Link>

          <Link to="/carrito" className="ms-nav-link" style={{ '--i': 1 }}>
            <FaShoppingCart className="ms-icon" style={{ color: '#f8c8dc' }} />
            <span>Carrito</span>
          </Link>

          <Link to="/login" className="ms-nav-link" style={{ '--i': 2 }}>
            <FaUserLock className="ms-icon" style={{ color: '#c080a3' }} />
            <span>Iniciar sesión</span>
          </Link>

          <Link to="/registro" className="ms-nav-link" style={{ '--i': 3 }}>
            <FaUserPlus className="ms-icon" style={{ color: '#dca3b3' }} />
            <span>Crear cuenta</span>
          </Link>

          <Link to="/promociones" className="ms-nav-link" style={{ '--i': 4 }}>
            <FaGift className="ms-icon" style={{ color: '#ffb6c1' }} />
            <span>Promociones</span>
          </Link>

          {usuario && !esAdmin && (
            <>
              <Link to="/pedidos" className="ms-nav-link" style={{ '--i': 5 }}>
                <FaClipboardList className="ms-icon" style={{ color: '#e6a1c2' }} />
                <span>Pedidos</span>
              </Link>
              <Link to="/envios" className="ms-nav-link" style={{ '--i': 6 }}>
                <FaTruck className="ms-icon" style={{ color: '#d88fae' }} />
                <span>Envíos</span>
              </Link>
            </>
          )}

          {esAdmin && (
            <Link to="/admin" className="ms-nav-link" style={{ '--i': 7 }}>
              <FaTools className="ms-icon" style={{ color: '#b86b95' }} />
              <span>Panel Admin</span>
            </Link>
          )}
        </div>

        {usuario && (
          <div className="ms-usuario">
            <span className="ms-saludo">Hola, <strong>{usuario}</strong></span>
            <div className="cerrar-sesion" onClick={cerrarSesion}>
              <FaSignOutAlt className="cerrar-icono" />
              <span>Cerrar sesión</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
