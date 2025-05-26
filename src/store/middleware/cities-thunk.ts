import { createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentOfferType, OffersType } from '../../utils/type';
import { NewComment, ReviewType } from '../slices/cities-slice';
import { API } from '../../services/api';

export const fetchAllOffers = createAsyncThunk(
  'offers/fetchAllOffers',
  async (_, { extra, rejectWithValue }) => {
    try {
      const { data } = await (extra as typeof API).get<OffersType[]>('/offers');
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load offers');
    }
  }
);

export const fetchCurrentOffer = createAsyncThunk(
  'offers/fetchCurrentOffer',
  async (offerId: string, { extra, rejectWithValue }) => {
    try {
      const { data } = await (extra as typeof API).get<CurrentOfferType>(
        `/offers/${offerId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load currentOffer');
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk(
  'offers/fetchNearbyOffers',
  async (offerId: string, { extra, rejectWithValue }) => {
    try {
      const { data } = await (extra as typeof API).get<OffersType[]>(
        `/offers/${offerId}/nearby`
      );
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load nearby offers');
    }
  }
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (offerId: string, { extra, rejectWithValue }) => {
    try {
      const { data } = await (extra as typeof API).get<ReviewType[]>(
        `/comments/${offerId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load comments');
    }
  }
);

export const sendComment = createAsyncThunk(
  'comments/sendComment',
  async (payload: NewComment, { extra, rejectWithValue }) => {
    try {
      const { data } = await (extra as typeof API).post<ReviewType>(
        `/comments/${payload.offerId}`,
        { comment: payload.comment, rating: Number(payload.rating) }
      );
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load new comment');
    }
  }
);

export type FavoriteStatusPayload = {
  offerId: string;
  status: number;
};

export const fetchFavorites = createAsyncThunk(
  'cities/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<OffersType[]>('/favorite');
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load favorites');
    }
  }
);

export const changeFavoriteStatus = createAsyncThunk(
  'favorite/changeFavoriteStatus',
  async (
    payload: FavoriteStatusPayload,
    { extra, rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await (extra as typeof API).post<OffersType>(
        `/favorite/${payload.offerId}/${payload.status}`,
        {
          offerId: payload.offerId,
          status: Number(payload.status),
        }
      );

      dispatch(fetchFavorites());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
