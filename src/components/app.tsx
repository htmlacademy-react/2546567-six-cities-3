import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FavoritePage from '../pages/favorite-page/favorite-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import { OffersPage } from '../pages/offers-page/offers-page';
import { AppRoute, AuthorizationStatus } from './const';
import NotFoundPage from '../pages/not-found-page';
import PrivateRoute from './private-route';

type NumberOfRentals = {
  offersCount: number;
};

function App({ offersCount }: NumberOfRentals) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offersCount={offersCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorite}
          element={(
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritePage />
            </PrivateRoute>)}
        />
        <Route
          path={AppRoute.Offers}
          element={<OffersPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
