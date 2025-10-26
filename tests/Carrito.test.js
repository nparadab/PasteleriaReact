import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from '../src/components/Carrito';
import { CarritoContext } from '../src/context/CarritoContext';

describe('Carrito', () => {
  const carritoMock = [
    { nombre: 'Torta de chocolate', cantidad: 1, precioUnitario: 5000, subtotal: 5000 },
    { nombre: 'Pie de limón', cantidad: 2, precioUnitario: 3000, subtotal: 6000 }
  ];

  it('muestra los productos del carrito', () => {
    render(
      <MemoryRouter>
        <CarritoContext.Provider value={{ carrito: carritoMock }}>
          <Carrito usuario="nicolas@example.com" />
        </CarritoContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Torta de chocolate/i)).not.toBeNull();
    expect(screen.getByText(/Pie de limón/i)).not.toBeNull();
  });
});
