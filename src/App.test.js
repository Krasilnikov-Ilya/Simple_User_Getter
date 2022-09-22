// noinspection JSCheckFunctionSignatures

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const text = "home page"
  const descriptionElement = screen.getByText(text);
  expect(descriptionElement).toBeInTheDocument();
});
