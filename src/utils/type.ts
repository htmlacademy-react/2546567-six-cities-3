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
  isPremium: boolean;
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
