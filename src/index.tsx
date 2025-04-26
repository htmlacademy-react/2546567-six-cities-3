import ReactDOM from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
