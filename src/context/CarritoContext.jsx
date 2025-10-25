import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    if (!producto?.nombre || !producto?.precio) return;
    setCarrito(prev => [...prev, producto]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
