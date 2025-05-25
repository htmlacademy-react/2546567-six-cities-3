export const AUTH_TOKEN_KEY = 'six-cities';

export type Token = string;

const getToken = (): Token =>
  localStorage.getItem(AUTH_TOKEN_KEY) || 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=';

const saveToken = (token: Token): void =>
  localStorage.setItem(AUTH_TOKEN_KEY, token);
const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

export { getToken, saveToken, dropToken };
