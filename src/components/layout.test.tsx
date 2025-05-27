import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Layout from './layout';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../utils/const';
import { getLayoutState } from '../utils/helpers';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  Outlet: vi.fn().mockImplementation(() => <div>Outlet</div>),
}));

vi.mock('../utils/helpers', () => ({
  getLayoutState: vi.fn(),
}));

vi.mock('./header', () => ({
  default: vi.fn().mockImplementation(() => <header>Header</header>),
}));

describe('Layout component', () => {
  const mockedUseLocation = vi.mocked(useLocation);
  const mockedGetLayoutState = vi.mocked(getLayoutState);

  it('should render correctly for main page', () => {
    mockedUseLocation.mockReturnValue({
      pathname: AppRoute.Root,
      state: null,
      key: '',
      search: '',
      hash: '',
    });

    mockedGetLayoutState.mockReturnValue({
      rootClassName: ' page--gray page--main',
      linkClassName: '',
      shouldRenderUser: false,
      shouldRenderFooter: false,
    });

    render(<Layout />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass(
      'page page--gray page--main'
    );
  });

  it('should render correctly for login page', () => {
    mockedUseLocation.mockReturnValue({
      pathname: AppRoute.Login,
      state: null,
      key: '',
      search: '',
      hash: '',
    });

    mockedGetLayoutState.mockReturnValue({
      rootClassName: ' page--gray page--login',
      linkClassName: '',
      shouldRenderUser: false,
      shouldRenderFooter: false,
    });

    render(<Layout />);

    expect(screen.getByTestId('layout')).toHaveClass(
      'page page--gray page--login'
    );
  });

  it('should render correctly for default page', () => {
    mockedUseLocation.mockReturnValue({
      pathname: '/unknown',
      state: null,
      key: '',
      search: '',
      hash: '',
    });

    mockedGetLayoutState.mockReturnValue({
      rootClassName: '',
      linkClassName: '',
      shouldRenderUser: false,
      shouldRenderFooter: false,
    });

    render(<Layout />);

    expect(screen.getByTestId('layout')).toHaveClass('page');
  });
});
