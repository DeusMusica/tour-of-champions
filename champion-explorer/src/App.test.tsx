import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders champion explorer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/champion explorer/i);
  expect(titleElement).toBeInTheDocument();
});
