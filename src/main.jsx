import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.key === 'F12' || 
     (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) || 
     (event.ctrlKey && event.key === 'U')) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
