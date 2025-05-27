import { AppRoute } from './const';

export const getRating = (starsCount: number) => {
  const clampedStars = Math.min(Math.max(starsCount, 0), 5);
  const percents = Math.round(clampedStars) * 20;
  return `${percents}%`;
};

export const getLayoutState = (pathname: AppRoute) => {
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Root) {
    rootClassName = 'page--gray page--main';
    linkClassName = 'header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = 'page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }
  return { rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter };
};
