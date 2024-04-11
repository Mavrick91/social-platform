import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Router>{children}</Router>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
