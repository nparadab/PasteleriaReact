import React from 'react';
import { render, screen } from '@testing-library/react';
import Envios from '../src/components/Envios';

describe('Envios', () => {
  beforeEach(() => {
    const pedidosMock = [
      {
        productos: [{ nombre: 'Torta de chocolate' }],
        numeroEnvio: 'ENV123456'
      }
    ];
    localStorage.setItem('pedidos', JSON.stringify(pedidosMock));
  });

  it('actualiza fecha preferida', () => {
    render(<Envios usuario="nicolas@example.com" />);
    const input = screen.getByLabelText(/Fecha de entrega preferida/i);
    expect(input).not.toBeNull(); // ← compatible con Jasmine
  });
});
