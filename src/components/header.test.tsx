import { render, screen } from '@testing-library/react';
import { describe, it, MockedFunction, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import { AuthorizationStatus, AppRoute } from '../utils/const';
import { useSelector } from 'react-redux';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(() => () => {}),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLocation: vi.fn().mockImplementation(() => ({
      pathname: AppRoute.Root,
    })),
  };
});

describe('Header component', () => {
  it('should render logo with alt text', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockImplementation(
      (callback) =>
        callback({
          user: {
            authorizationStatus: AuthorizationStatus.Unknown,
            authData: null,
          },
          cities: {
            allOffers: [],
          },
        })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
