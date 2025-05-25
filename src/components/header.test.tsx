// header.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Header from './header';
import { AppRoute, AuthorizationStatus } from '../utils/const';

const mockStore = configureMockStore();
const mockNavigate = vi.fn();

vi.mock('../utils/type', () => ({
  getLayoutState: vi.fn().mockReturnValue({
    linkClassName: '',
    shouldRenderUser: true,
  }),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<object>('react-router-dom')),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: AppRoute.Root,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo correctly', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
      cities: { allOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('shows sign in when unauthorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
      cities: { allOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('shows user info when authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        authData: { email: 'test@test.com' },
      },
      cities: { allOffers: [{ isFavorite: true }, { isFavorite: true }] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('navigates to favorites on counter click', async () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        authData: { email: 'test@test.com' },
      },
      cities: { allOffers: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('favorites-count'));
    expect(mockNavigate).toHaveBeenCalledWith('favorite');
  });

  it('clears storage on sign out', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      cities: { allOffers: [] },
    });

    const mockClear = vi.spyOn(Storage.prototype, 'clear');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Sign out/i));
    expect(mockClear).toHaveBeenCalled();
  });
});
