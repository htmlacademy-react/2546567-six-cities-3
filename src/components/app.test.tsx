import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './app';
import { AppRoute } from '../utils/const';

// Мокаем все зависимости связанные с Redux
vi.mock('../store', () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

// Мокаем страницы
vi.mock('../pages/main-page/main-page', () => ({
  default: () => <div>Main page</div>,
}));

vi.mock('../pages/favorite-page/favorites-page', () => ({
  default: () => <div>Favorite page</div>,
}));

vi.mock('../pages/login-page/login-page', () => ({
  default: () => <div>Login page</div>,
}));

vi.mock('../pages/offers-page/offer-page', () => ({
  default: () => <div>Offer page</div>,
}));

vi.mock('../pages/not-found-page/not-found-page', () => ({
  default: () => <div>Not Found page</div>,
}));

// Мокаем запросы
vi.mock('../store/middleware/user-thunk', () => ({
  fetchLogin: vi.fn(),
}));

describe('Component: App', () => {
  const setupTest = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  };

  it('should render MainPage for root route', () => {
    setupTest(AppRoute.Root);
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render LoginPage for /login route', () => {
    setupTest(AppRoute.Login);
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render OfferPage for /offer/:id route', () => {
    setupTest(`${AppRoute.Offer}/123`);
    expect(screen.getByText('Offer page')).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown route', () => {
    setupTest('/unknown-route');
    expect(screen.getByText('Not Found page')).toBeInTheDocument();
  });
});
