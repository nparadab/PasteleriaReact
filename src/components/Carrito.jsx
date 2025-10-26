import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext.jsx';
import { useNavigate } from 'react-router-dom';

const Carrito = ({ usuario }) => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const finalizarCompra = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para finalizar la compra.');
      navigate('/login');
      return;
    }

    const resumen = carrito.reduce((acc, item) => {
      const clave = item.nombre;
      if (!clave || !item.precio) return acc;

      acc[clave] = acc[clave] || {
        nombre: item.nombre,
        precioUnitario: item.precio,
        cantidad: 0,
        forma: item.forma,
        tamaño: item.tamaño,
        imagen: item.imagen
      };

      acc[clave].cantidad += 1;
      acc[clave].subtotal = acc[clave].precioUnitario * acc[clave].cantidad;
      return acc;
    }, {});

    const productosAgrupados = Object.values(resumen);
    const totalPedido = productosAgrupados.reduce((acc, p) => acc + p.subtotal, 0);
    const numeroEnvio = 'MS-' + Math.floor(100000 + Math.random() * 900000);

    const nuevoPedido = {
      numeroEnvio,
      productos: productosAgrupados,
      total: totalPedido
    };

    const pedidosActuales = JSON.parse(localStorage.getItem('pedidos')) || [];
    localStorage.setItem('pedidos', JSON.stringify([...pedidosActuales, nuevoPedido]));

    vaciarCarrito();
    alert(`¡Compra finalizada! Tu número de envío es ${numeroEnvio}`);
    navigate('/pedidos');
  };

  return (
    <div className="contenedor-pastel fade-in">
      <h1 className="tituloPastel">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table id="carritoTabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="resumen">
            <p>Total: <strong>${total}</strong></p>
            <button className="ms-boton" onClick={finalizarCompra}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
