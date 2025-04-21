import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FavoritePage from '../pages/favorite-page/favorite-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';

import { AppRoute, AuthorizationStatus } from './const';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import { OffersType } from '../utils/type';
import OfferPage from '../pages/offers-page/offer-page';

type AppProps = {
  offersCount: number;
  offers: OffersType[];
};

function App({ offersCount, offers }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route
            index
            element={<MainPage offersCount={offersCount} offers={offers} />}
          />
          <Route
            path={AppRoute.Favorite}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritePage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offers}/:id`}
            element={<OfferPage offers={offers} />}
          />
        </Route>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
