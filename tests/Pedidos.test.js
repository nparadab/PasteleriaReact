import React from 'react';
import { render, screen } from '@testing-library/react';
import Pedidos from '../src/components/Pedidos';

describe('Pedidos', () => {
  beforeEach(() => {
    localStorage.removeItem('pedidos');
  });

  it('muestra mensaje si no hay pedidos', () => {
    render(<Pedidos usuario="nicolas@example.com" />);
    const mensaje = screen.getByText(/No hay pedidos registrados/i);
    expect(mensaje).not.toBeNull(); // ← compatible con Jasmine
  });
});
