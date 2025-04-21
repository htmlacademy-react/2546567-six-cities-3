import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { OFFERS } from './mocks/mocks';
import { Provider } from 'react-redux';
import { store } from './reducer/reducer';

const settings = {
  offersCount: 312,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersCount={settings.offersCount} cards={OFFERS} />
    </Provider>
  </React.StrictMode>
);
