import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersType, TLocationCoordinates } from '../../utils/type';
import { CITIES, CitiesEnum } from '../../components/const';
import { OFFERS } from '../../mocks/mocks';

const DEFAULT_CITY =
  CITIES.find((item) => item.name === CitiesEnum.Amsterdam) || CITIES[0];

const DEFAULT_OFFERS = OFFERS.filter(
  (item) => item.city.name === DEFAULT_CITY.name
);

// тип городов
export type TCity = {
  name: CitiesEnum;
  location: TLocationCoordinates;
};

//тип состояния
export interface CitiesState {
  currentCity: TCity;
  offers: OffersType[];
  selectedPoint: OffersType | null;
}
// изначальное состояние
const initialState: CitiesState = {
  currentCity: DEFAULT_CITY,
  offers: DEFAULT_OFFERS,
  selectedPoint: null,
};
// хранилище
const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<TCity>) => {
      const newCity = CITIES.find((city) => city.name === action.payload.name);

      if (newCity) {
        state.currentCity = newCity;
        state.offers = OFFERS.filter((item) => item.city.name === newCity.name);
      }
    },
    setSelectedPoint: (state, action: PayloadAction<OffersType | null>) => {
      state.selectedPoint = action.payload;
    },
  },
});

export const { setCurrentCity, setSelectedPoint } = citiesSlice.actions;

export default citiesSlice.reducer;
