import { Outlet, useLocation } from "react-router-dom";
import { AppRoute } from "../const";
import { getLayoutState } from "../../utils/type";

import Header from "../header";

export default function Layout() {
  const { pathname } = useLocation();
  const { rootClassName } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page${rootClassName}`}>
      <Header />
      <Outlet />
    </div>
  );
}