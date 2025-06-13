import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Calendar header', () => {
  render(<App />);
  const headerElement = screen.getByText(/calendar/i);
  expect(headerElement).toBeInTheDocument();
});

// src/App.test.js

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
