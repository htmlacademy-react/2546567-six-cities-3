import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';

const enum Default {
  BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities',
  Timeout = 5000,
}

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: Default.BACKEND_URL as string,
    timeout: Default.Timeout as number,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token; // Исправлено здесь
    }

    return config;
  });
  return api;
}

export const API = createAPI();
