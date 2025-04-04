import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { CARDS } from './mocks/mocks';

const settings = {
  offersCount: 312,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={settings.offersCount} cards={CARDS} />
  </React.StrictMode>
);
