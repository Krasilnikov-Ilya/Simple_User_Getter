// noinspection JSCheckFunctionSignatures

import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Тесты, проводящиеся по команде npm test или запускаемые из package.json
 * Запуск тестов возможен без предварительного запуска приложения через npm start.
 */

test('renders Authorization page', () => {
  render(<App />);
  const text = "Authorization"
  const descriptionElement = screen.getByText(text);
  expect(descriptionElement).toBeInTheDocument();
});
