import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLayoutState } from '../utils/type';
import { AppRoute, AuthorizationStatus } from './const';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index.ts';
import { memo } from 'react';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { linkClassName, shouldRenderUser } = getLayoutState(
    pathname as AppRoute
  );

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );
  const authData = useSelector((state: RootState) => state.user.authData);
  const allOffers = useSelector((state: RootState) => state.cities.allOffers);

  const favoritesCount = allOffers.filter((item) => item.isFavorite).length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link${linkClassName}`}
              to={AppRoute.Root}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
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
                        <span
                          className="header__favorite-count"
                          onClick={(evt) => {
                            evt.preventDefault();
                            navigate('favorite');
                          }}
                        >
                          {favoritesCount}
                        </span>
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

const MemorizedHeader = memo(Header);

export default MemorizedHeader;
