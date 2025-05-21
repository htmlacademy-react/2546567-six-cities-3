import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import { getLayoutState } from '../../utils/type';

import Header from '../header';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchFavorites } from '../../store/middleware/cities-thunk';

export default function Layout() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { rootClassName } = getLayoutState(pathname as AppRoute);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={`page${rootClassName}`}>
      <Header />
      <Outlet />
    </div>
  );
}
