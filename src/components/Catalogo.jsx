import { useState } from 'react';
import tortas from '../data/tortas';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import '../styles/style.css';

const Catalogo = () => {
  const [formaFiltro, setFormaFiltro] = useState('');
  const [tamañoFiltro, setTamañoFiltro] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { agregarProducto } = useContext(CarritoContext);

  const tortasFiltradas = tortas.filter(torta => {
    return (
      (formaFiltro === '' || torta.forma === formaFiltro) &&
      (tamañoFiltro === '' || torta.tamaño === tamañoFiltro)
    );
  });

  const agregarConMensaje = (torta) => {
    const tortaConMensaje = { ...torta, mensaje };
    agregarProducto(tortaConMensaje);
  };

  return (
    <div className="container">
      <h2 className="tituloPastel">Catálogo de Tortas</h2>

      <div className="filtros-contenedor">
        <div className="ms-filtros">
          <label>Forma:</label>
          <select
            value={formaFiltro}
            onChange={(e) => setFormaFiltro(e.target.value)}
            className="ms-filtro-select"
          >
            <option value="">Todas</option>
            <option value="Redonda">Redonda</option>
            <option value="Cuadrada">Cuadrada</option>
          </select>

          <label>Tamaño:</label>
          <select
            value={tamañoFiltro}
            onChange={(e) => setTamañoFiltro(e.target.value)}
            className="ms-filtro-select"
          >
            <option value="">Todos</option>
            <option value="Pequeña">Pequeña</option>
            <option value="Mediana">Mediana</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
      </div>

      <div className="mensaje-box">
        <input
          type="text"
          id="mensajePersonalizado"
          className="ms-mensaje-input"
          placeholder="Escribe un mensaje para tu torta"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        {mensaje && <p id="mensajeFinal">Tu mensaje: {mensaje}</p>}
      </div>

      <div className="ms-catalogo">
        {tortasFiltradas.map((torta) => (
          <div className="ms-torta-card fade-in" key={torta.nombre}>
            <img src={torta.imagen} alt={torta.nombre} className="ms-torta-img" />
            <h3 className="ms-torta-nombre">{torta.nombre}</h3>
            <p className="ms-torta-precio">${torta.precio}</p>
            <button
              className="ms-boton"
              onClick={() => agregarConMensaje(torta)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
