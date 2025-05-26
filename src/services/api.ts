import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://16.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
}

export const API = createAPI();
