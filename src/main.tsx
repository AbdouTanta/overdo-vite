import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './contexts/data-provider';
import ModalWrapper from './components/modals/ModalWrapper';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <App />
      <ModalWrapper />
    </DataProvider>
  </React.StrictMode>
);
