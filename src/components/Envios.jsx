import React, { useEffect, useState } from 'react';
import '../styles/style.css';

const Envios = ({ usuario }) => {
  const [envios, setEnvios] = useState([]);

  const estados = [
    'Preparando paquete',
    'En tránsito',
    'En reparto',
    'Entregado'
  ];

  // Generar código único de envío
  const generarCodigo = () => {
    return 'ENV' + Math.floor(100000 + Math.random() * 900000);
  };

  useEffect(() => {
    if (!usuario) return;

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    const enviosGenerados = pedidos.map((pedido) => ({
      productos: pedido.productos.map((p) => p.nombre).join(', '),
      estadoPaso: 0,
      fechaPreferida: '',
      numeroEnvio: pedido.numeroEnvio || generarCodigo(),
    }));

    setEnvios(enviosGenerados);
  }, [usuario]);

  // Actualizar estado y persistir en localStorage
  const actualizarEstado = (index) => {
    setEnvios((prev) => {
      const nuevosEnvios = prev.map((envio, i) =>
        i === index
          ? { ...envio, estadoPaso: (envio.estadoPaso + 1) % estados.length }
          : envio
      );
      localStorage.setItem('envios', JSON.stringify(nuevosEnvios));
      return nuevosEnvios;
    });
  };

  // Guardar fecha preferida y persistir en localStorage
  const guardarFecha = (index, fecha) => {
    setEnvios((prev) => {
      const nuevosEnvios = prev.map((envio, i) =>
        i === index ? { ...envio, fechaPreferida: fecha } : envio
      );
      localStorage.setItem('envios', JSON.stringify(nuevosEnvios));
      return nuevosEnvios;
    });
  };

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus envíos.</p>;
  }

  return (
    <div className="contenedor-pastel fade-in">
      <h1 className="tituloPastel">Estado de Envíos</h1>
      <p>Consulta el estado de tus entregas.</p>

      {envios.length === 0 ? (
        <p>No tienes envíos registrados.</p>
      ) : (
        envios.map((envio, index) => (
          <div key={envio.numeroEnvio} className="envio-box">
            <p><strong>Producto(s):</strong> {envio.productos}</p>
            <p><strong>N° de Envío:</strong> {envio.numeroEnvio}</p>
            <p><strong>Estado actual:</strong> {estados[envio.estadoPaso]}</p>
            <button
              className="boton-catalogo"
              onClick={() => actualizarEstado(index)}
            >
              Actualizar Estado
            </button>

            <div className="fecha-box">
              <label htmlFor={`fecha-${index}`}>Fecha de entrega preferida:</label>
              <input
                type="date"
                id={`fecha-${index}`}
                value={envio.fechaPreferida}
                onChange={(e) => guardarFecha(index, e.target.value)}
              />
              {envio.fechaPreferida && (
                <p>Fecha guardada: {envio.fechaPreferida}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Envios;
