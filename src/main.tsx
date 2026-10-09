import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './lib/analytics';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Analytics loads after the page is interactive and idle.
window.addEventListener('load', () => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
  (w.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500)))(initAnalytics);
});
