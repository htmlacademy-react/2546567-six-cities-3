import { configureStore } from '@reduxjs/toolkit';

import citiesReducer from './slices/cities-slice';
import { useDispatch } from 'react-redux';
import { API } from '../services/api';
import userReducer from './slices/user-slice';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: API,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
