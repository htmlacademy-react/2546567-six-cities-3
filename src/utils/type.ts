import { AppRoute } from '../components/const';

export type MainPageProps = {
  offersCount: number;
  cards: CardType[];
};

export type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type TCity = {
  name: string;
  location: TLocationCoordinates;
};
export type Tdescription = {
  priceValue: number;
  rating: number;
  placeCardType: string;
  maxAdults: number;
  bedrooms: number;
};

export type CardType = {
  id: number;
  img: string;
  pictures: string[];
  description: Tdescription;
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

export type RevierwType = {
  id: number;
  name: string;
  raiting: number;
  text: string;
};
