import { Route, Routes } from 'react-router-dom';
import FavoritePage from '../pages/favorite-page/favorites-page.tsx';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';

import { AppRoute, AuthorizationStatus } from '../utils/const.ts';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import OfferPage from '../pages/offers-page/offer-page';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../store/index.ts';
import { fetchLogin } from '../store/middleware/user-thunk.ts';
import { useSelector } from 'react-redux';
import Loading from './loading.tsx';

function App() {
  const dispatch = useAppDispatch();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  // Выполняем запрос при монтировании компонента
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(fetchLogin());
    }
  }, [authorizationStatus, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritePage />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path={AppRoute.Login} element={<LoginPage />} />
    </Routes>
  );
}

export default App;
