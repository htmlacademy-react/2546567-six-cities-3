import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersType, TLocationCoordinates } from '../../utils/type';
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

//тип состояния
export interface CitiesState {
  currentCity: TCity;
  allOffers: OffersType[];
  selectedPoint: OffersType | null;
  status: RequestStatus;
}

// изначальное состояние
const initialState: CitiesState = {
  currentCity: DEFAULT_CITY,
  allOffers: [],
  selectedPoint: null,
  status: RequestStatus.Idle,
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
      }),
});

export const { setCurrentCity, setSelectedPoint } = citiesSlice.actions;

export default citiesSlice.reducer;
