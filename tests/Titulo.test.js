import React from 'react';
import { render } from '@testing-library/react';

describe('Título pastel', () => {
  it('se renderiza correctamente', () => {
    const { container } = render(<h1 className="tituloPastel">Tu Carrito</h1>);
    expect(container.querySelector('.tituloPastel')).toBeTruthy();
  });
});
