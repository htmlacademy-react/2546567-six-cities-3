import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CurrentOfferType,
  OffersType,
  TLocationCoordinates,
  UserInfo,
} from '../../utils/type';
import { CITIES, CitiesEnum, RequestStatus } from '../../components/const';
import { API } from '../../services.ts/api';

const DEFAULT_CITY =
  CITIES.find((item) => item.name === CitiesEnum.Paris) || CITIES[0];

// тип городов
export type TCity = {
  name: CitiesEnum;
  location: TLocationCoordinates;
  offers: OffersType[];
};

export type ReviewType = {
  id: string;
  date: Date;
  user: UserInfo;
  comment: string;
  rating: number;
};

export type NewComment = {
  offerId: string;
  comment: string;
  rating: number;
};

//тип состояния
export interface CitiesState {
  currentCity: TCity;
  allOffers: OffersType[];
  selectedPoint: OffersType | null;
  status: RequestStatus;
  currentOffer: CurrentOfferType | null;
  nearbyOffers: OffersType[];
  comments: ReviewType[];
}

// изначальное состояние
const initialState: CitiesState = {
  currentCity: DEFAULT_CITY,
  allOffers: [],
  selectedPoint: null,
  status: RequestStatus.Idle,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
};

// Создаем thunk для загрузки предложений
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

// хранилище
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<TCity>) => {
      const currentOffers = state.allOffers.filter(
        (item) => item.city.name === action.payload.name
      );
      state.currentCity = { ...action.payload, offers: currentOffers };
    },
    setSelectedPoint: (state, action: PayloadAction<OffersType | null>) => {
      state.selectedPoint = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.allOffers = action.payload;

        const currentOffers = action.payload.filter(
          (item: OffersType) => item.city.name === state.currentCity.name
        );
        state.currentCity = { ...state.currentCity, offers: currentOffers };
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(fetchCurrentOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;

        state.currentOffer = action.payload;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(fetchNearbyOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;

        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(sendComment.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(sendComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
});

export const { setCurrentCity, setSelectedPoint } = citiesSlice.actions;

export default citiesSlice.reducer;
