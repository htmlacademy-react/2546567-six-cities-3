import ReactDOM from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
