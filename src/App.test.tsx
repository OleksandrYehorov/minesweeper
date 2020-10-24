import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders app', () => {
  const { container } = render(<App />);

  expect(container).toBeInTheDocument();
});
