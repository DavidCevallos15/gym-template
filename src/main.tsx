import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Solo subset latin (cubre español: á é í ó ú ñ ¿ ¡) y solo pesos usados
import '@fontsource/barlow-condensed/latin-500.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import './styles/globals.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
