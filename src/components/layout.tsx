import { Outlet, useLocation } from 'react-router-dom';
import MemorizedHeader from './header';
import { AppRoute } from '../utils/const';
import { getLayoutState } from '../utils/helpers';

export default function Layout() {
  const { pathname } = useLocation();
  const { rootClassName } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page${rootClassName}`} data-testid="layout">
      <MemorizedHeader />
      <Outlet />
    </div>
  );
}
