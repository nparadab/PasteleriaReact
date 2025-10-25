import { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos desde localStorage al iniciar
  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosGuardados);
  }, []);

  // Guardar pedidos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const agregarPedido = (producto) => {
    setPedidos(prev => [...prev, producto]);
  };

  const vaciarPedidos = () => {
    setPedidos([]);
    localStorage.removeItem('pedidos');
  };

  return (
    <PedidoContext.Provider value={{ pedidos, agregarPedido, vaciarPedidos }}>
      {children}
    </PedidoContext.Provider>
  );
};
