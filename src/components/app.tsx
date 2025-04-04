import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FavoritePage from '../pages/favorite-page/favorite-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';

import { AppRoute, AuthorizationStatus } from './const';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import { CardType } from '../utils/type';
import OfferPage from '../pages/offers-page/offer-page';


type AppProps = {
  offersCount: number;
  cards: CardType[];
};

function App({ offersCount, cards }: AppProps) {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage offersCount={offersCount} cards={cards} />} />
          <Route
            path={AppRoute.Favorite}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritePage cards={cards} />
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offers}/:id`} element={<OfferPage cards={cards} />} />
        </Route>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;