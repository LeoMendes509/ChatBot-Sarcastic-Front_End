import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWithProviders from './App';

// Renders the application in the element with id "root"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
