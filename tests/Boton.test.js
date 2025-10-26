import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('Botón de compra', () => {
  it('ejecuta función al hacer clic', () => {
    const mockFn = jasmine.createSpy('mockFn');
    const { getByText } = render(<button onClick={mockFn}>Comprar</button>);
    fireEvent.click(getByText('Comprar'));
    expect(mockFn).toHaveBeenCalled();
  });
});
