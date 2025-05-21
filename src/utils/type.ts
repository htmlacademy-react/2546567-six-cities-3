import { AppRoute } from '../components/const';
import { TCity } from '../store/slices/cities-slice';

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
  placeCardType: string;
  maxAdults: number;
  bedrooms: number;
};

export type OffersType = {
  id: string;
  previewImage: string;
  pictures: string[];
  description: TDescription;
  premiumMark: boolean;
  title: string;
  isFavorite: boolean;
  city: TCity;
  goods: string[];
  location: TLocationCoordinates;
  price: number;
  rating: number;
  type: string;
};

export type UserInfo = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type CurrentOfferType = {
  bedrooms: number;
  city: TCity;
  description: string;
  goods: string[];
  host: UserInfo;
  id: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: TLocationCoordinates;
  maxAdults: number;
  price: number;
  rating: number;
  title: string;
  type: string;
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
