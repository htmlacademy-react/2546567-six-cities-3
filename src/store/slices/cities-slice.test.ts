import { describe, expect, it } from 'vitest';
import { CitiesEnum } from '../../utils/const';
import {
  citiesSlice,
  CitiesState,
  INITIAL_CITIES_STATE,
  setCurrentCity,
} from './cities-slice';

describe('Cities slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: CitiesState = INITIAL_CITIES_STATE;
    const result = citiesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const expectedState: CitiesState = INITIAL_CITIES_STATE;
    const result = citiesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should set current city with setCurrentCity action', () => {
    const newCity = {
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
      name: CitiesEnum.Amsterdam,
      offers: [],
    };
    const initialState: CitiesState = INITIAL_CITIES_STATE;
    const expectedState: CitiesState = {
      ...INITIAL_CITIES_STATE,
      currentCity: newCity,
    };
    const result = citiesSlice.reducer(initialState, setCurrentCity(newCity));

    expect(result).toEqual(expectedState);
  });
});
