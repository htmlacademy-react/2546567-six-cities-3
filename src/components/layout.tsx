import { Outlet, useLocation } from 'react-router-dom';
import MemorizedHeader from './header';
import { getLayoutState } from '../utils/type';
import { AppRoute } from '../utils/const';

export default function Layout() {
  const { pathname } = useLocation();
  const { rootClassName } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page${rootClassName}`}>
      <MemorizedHeader />
      <Outlet />
    </div>
  );
}
