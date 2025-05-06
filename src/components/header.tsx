import { useLocation } from 'react-router-dom';
import { getLayoutState } from '../utils/type';
import { AppRoute, AuthorizationStatus } from './const';
import { useSelector } from 'react-redux';
import { RootState } from '../store.ts';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const { linkClassName, shouldRenderUser } = getLayoutState(
    pathname as AppRoute
  );

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );
  const authData = useSelector((state: RootState) => state.user.authData);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className={`header__logo-link${linkClassName}`}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>
          {shouldRenderUser ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span className="header__user-name user__name">
                          {authData?.email || ''}
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </a>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="/"
                      onClick={() => {
                        localStorage.clear();
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
