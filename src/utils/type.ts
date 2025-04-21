import { AppRoute } from '../components/const';
import { TCity } from '../reducer/cities/citiesSlice';

export type MainPageProps = {
  offersCount: number;
  offers: OffersType[];
};

export type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TDescription = {
  priceValue: number;
  rating: number;
  placeCardType: string;
  maxAdults: number;
  bedrooms: number;
};

export type OffersType = {
  id: number;
  img: string;
  pictures: string[];
  description: TDescription;
  premiumMark: boolean;
  placeCardName: string;
  isFavorite: boolean;
  city: TCity;
  goods: string[];
  location: TLocationCoordinates;
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
  } else if (pathname === AppRoute.Favorite) {
    shouldRenderFooter = true;
  }
  return { rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter };
};

export type ReviewType = {
  id: number;
  name: string;
  rating: number;
  text: string;
};
