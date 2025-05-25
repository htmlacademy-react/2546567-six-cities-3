import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus } from '../utils/const';
import { describe, expect, it } from 'vitest';

describe('Component: PrivateRoute', () => {
  const TestComponent = () => <div>Private content</div>;
  const LoginComponent = () => <div>Login page</div>;

  const renderWithAuthStatus = (authStatus: AuthorizationStatus) =>
    render(
      <MemoryRouter initialEntries={[AppRoute.Root]}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                {authStatus === AuthorizationStatus.Auth ? (
                  <TestComponent />
                ) : (
                  <Navigate to={AppRoute.Login} />
                )}
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

  it('should render children when authorized', () => {
    renderWithAuthStatus(AuthorizationStatus.Auth);

    expect(screen.getByText('Private content')).toBeInTheDocument();
    expect(screen.queryByText('Login page')).toBeNull();
  });

  it('should redirect to login when not authorized', () => {
    renderWithAuthStatus(AuthorizationStatus.NoAuth);

    // Проверяем что произошёл редирект
    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).toBeNull();
  });
});
