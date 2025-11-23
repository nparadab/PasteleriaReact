import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Home = ({ usuario, esAdmin }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [index, setIndex] = useState(0);

  const imagenes = [
    '/imagenes/torta1.png',
    '/imagenes/torta2.png',
    '/imagenes/torta3.png'
  ];

  const hora = new Date().getHours();
  const fondo = hora < 12 ? '#fffaf0' : hora < 18 ? '#ffe4e1' : '#f8c8dc';

  useEffect(() => {
    setFadeIn(true);

    // ✅ Carrusel automático cada 5 segundos
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const siguiente = () => {
    setIndex((index + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndex((index - 1 + imagenes.length) % imagenes.length);
  };

  const year = new Date().getFullYear();

  return (
    <div
      className={`contenedor-pastel ${fadeIn ? 'fade-in' : ''}`}
      style={{ backgroundColor: fondo }}
    >
      <h2 className="tituloPastel">Bienvenido a Mil Sabores</h2>
      <p className="subtituloPastel">Las tortas más ricas, ahora también online.</p>

      <div className="carrusel">
        <img
          src={imagenes[index]}
          alt={`Torta ${index + 1}`}
          className="imagen-carrusel"
        />
        <button className="flecha izquierda" onClick={anterior}>❮</button>
        <button className="flecha derecha" onClick={siguiente}>❯</button>
      </div>

      <div className="botonesInicio">
        <Link to="/catalogo" className="ms-boton">Ver catálogo</Link>
        <Link to="/promociones" className="ms-boton">Promociones</Link>
        {!usuario && <Link to="/registro" className="ms-boton">Crear cuenta</Link>}
        {usuario && <Link to="/perfil" className="ms-boton">Mi perfil</Link>}
        {esAdmin && <Link to="/admin" className="ms-boton">Panel Admin</Link>}
      </div>

      {usuario && (
        <p className="bienvenida-usuario">¡Hola {usuario}, qué bueno verte por aquí!</p>
      )}

      {usuario && !esAdmin && (
        <div className="opcionesCliente">
          <h3>Opciones disponibles:</h3>
          <ul>
            <li><strong>Pedidos:</strong> Ver tus pedidos realizados</li>
            <li><strong>Envíos:</strong> Estado de tus entregas</li>
          </ul>
        </div>
      )}

      {esAdmin && (
        <div className="opcionesAdmin">
          <h3>Panel de administración activo</h3>
          <p>
            Accediste como <strong>admin</strong>. Puedes gestionar pedidos,
            envíos, usuarios y tortas personalizadas.
          </p>
        </div>
      )}

      <footer className="ms-footer">
        <hr className="ms-footer-line" />
        <p className="ms-footer-text">
          © {year} Pastelería Mil Sabores — Proyecto desarrollado por{' '}
          <span className="ms-nombre">Nicolás Parada</span>{' '}
          <span className="ms-nombre">Ana Pasarín</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
