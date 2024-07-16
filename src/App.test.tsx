import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bookstore', () => {
  render(<App />);
  const bookstoreElement = screen.getByText(/bookstore/i);
  expect(bookstoreElement).toBeInTheDocument();
});
