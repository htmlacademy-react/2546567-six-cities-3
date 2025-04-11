export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorite = '/favorire',
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
export const URL_MARCER_ACTIVE = 'img/pin-active.svg';

export const placesOption: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
