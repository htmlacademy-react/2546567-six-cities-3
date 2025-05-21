import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FavoritePage from '../pages/favorite-page/favorites-page.tsx';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';

import { AppRoute } from './const';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import OfferPage from '../pages/offers-page/offer-page';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/index.ts';
import { fetchLogin } from '../store/middleware/user-thunk.ts';

function App() {
  const dispatch = useAppDispatch();

  // Выполняем запрос при монтировании компонента
  useEffect(() => {
    dispatch(fetchLogin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={AppRoute.Favorite}
            element={
              <PrivateRoute>
                <FavoritePage />
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offers}/:id`} element={<OfferPage />} />
        </Route>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
