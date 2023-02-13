import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './contexts/data-provider';
import ModalWrapper from './components/modals/ModalWrapper';
import Layout from './Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <Layout>
        <App />
      </Layout>
      <ModalWrapper />
    </DataProvider>
  </React.StrictMode>
);
