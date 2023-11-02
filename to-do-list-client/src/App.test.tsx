import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders Main page', () => {
  render(<App />);
  const appTitle = screen.getByText(/to do list/i);
  expect(appTitle).toBeInTheDocument();
});
