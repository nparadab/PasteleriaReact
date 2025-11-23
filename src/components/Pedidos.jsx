import { useEffect, useState } from 'react';
import cliente from '../api/cliente';

const Pedidos = ({ usuario, esAdmin }) => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      // Si es admin, obtiene todos los pedidos
      // Si es cliente, obtiene solo los suyos
      const endpoint = esAdmin ? '/api/pedidos' : `/api/pedidos/mis-pedidos`;
      const res = await cliente.get(endpoint);
      setPedidos(res.data);
    } catch (error) {
      console.error('Error al obtener pedidos', error);
    }
  };

  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus pedidos.</p>;
  }

  return (
    <div className="contenedor-pastel fade-in">
      <h1 className="tituloPastel">
        {esAdmin ? 'Gestión de Pedidos' : 'Mis Pedidos'}
      </h1>

      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-box">
            <p><strong>Número de envío:</strong> {pedido.numeroEnvio}</p>
            <p><strong>Cliente:</strong> {pedido.cliente?.nombre || usuario}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>

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
                {pedido.productos.map((prod) => (
                  <tr key={prod.id}>
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
