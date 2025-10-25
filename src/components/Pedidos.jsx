import { useEffect, useState } from 'react';

const Pedidos = ({ usuario }) => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosGuardados);
  }, []);

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus pedidos.</p>;
  }

  return (
    <div className="contenedor-pastel fade-in">
      <h1 className="tituloPastel">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        pedidos.map((pedido, index) => (
          <div key={index} className="pedido-box">
            <p><strong>Número de envío:</strong> {pedido.numeroEnvio}</p>

            <table className="tablaPedidos">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.productos.map((prod, i) => (
                  <tr key={i}>
                    <td>{prod.nombre}</td>
                    <td>{prod.cantidad}</td>
                    <td>${prod.precioUnitario}</td>
                    <td>${prod.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resumenTotal">
              <p>Total de la compra: <strong>${pedido.total}</strong></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
