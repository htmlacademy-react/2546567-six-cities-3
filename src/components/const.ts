import { TCity } from '../reducer/cities/citiesSlice';

export enum CitiesEnum {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Dusseldorf = 'Dusseldorf',
  Hamburg = 'Hamburg',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorite = '/favorite',
  Offers = '/offers',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const rating = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'hot bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' },
];

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const placesOption: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
// satisfies Record<SortOption, string>;

export enum SortOption {
  Popular = 0,
  PriceLowToHigh = 1,
  PriceHighToLow = 2,
  TopRatedFirst = 3,
}

export const CITIES: TCity[] = [
  {
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
    name: CitiesEnum.Paris,
  },
  {
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
    name: CitiesEnum.Cologne,
  },
  {
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
    name: CitiesEnum.Brussels,
  },
  {
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
    name: CitiesEnum.Amsterdam,
  },
  {
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
    name: CitiesEnum.Dusseldorf,
  },
  {
    location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
    name: CitiesEnum.Hamburg,
  },
];
