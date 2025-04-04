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
