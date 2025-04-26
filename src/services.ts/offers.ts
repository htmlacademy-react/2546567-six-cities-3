import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { OffersType } from '../utils/type';
import { AppRoute } from '../components/const';

const fetchAllOffers = createAsyncThunk<
  OffersType[],
  void,
  { extra: AxiosInstance }
>('fetchOffers/all', async (_arg, { extra: api }) => {
  const response = await api.get<OffersType[]>(AppRoute.Offers);
  return response.data;
});

export default fetchAllOffers;
