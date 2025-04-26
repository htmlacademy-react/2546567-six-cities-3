import { configureStore } from '@reduxjs/toolkit';

import citiesReducer from '../reducer/cities/citiesSlice';
import { useDispatch } from 'react-redux';
import { API } from '../services.ts/api';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: API } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
