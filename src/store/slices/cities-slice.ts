import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CurrentOfferType,
  OffersType,
  TLocationCoordinates,
  UserInfo,
} from '../../utils/type';
import { CITIES, CitiesEnum, RequestStatus } from '../../utils/const';
import {
  changeFavoriteStatus,
  fetchAllOffers,
  fetchComments,
  fetchCurrentOffer,
  fetchFavorites,
  fetchNearbyOffers,
  sendComment,
} from '../middleware/cities-thunk';

const DEFAULT_CITY =
  CITIES.find((item) => item.name === CitiesEnum.Paris) || CITIES[0];

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

export interface CitiesState {
  currentCity: TCity;
  allOffers: OffersType[];
  selectedPoint: OffersType | null;
  status: RequestStatus;
  currentOffer: CurrentOfferType | null;
  nearbyOffers: OffersType[];
  comments: ReviewType[];
  favorites: OffersType[];
}

export const INITIAL_CITIES_STATE: CitiesState = {
  currentCity: DEFAULT_CITY,
  allOffers: [],
  selectedPoint: null,
  status: RequestStatus.Idle,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  favorites: [],
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: INITIAL_CITIES_STATE,
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

        state.nearbyOffers = action.payload.slice(0, 3);
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
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(sendComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(changeFavoriteStatus.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        changeFavoriteStatus.fulfilled,
        (state, action: PayloadAction<OffersType>) => {
          const updatedOffer = action.payload;

          const updateOffers = (offers: OffersType[]) =>
            offers.map((offer) =>
              offer.id === updatedOffer.id
                ? { ...offer, isFavorite: updatedOffer.isFavorite }
                : offer
            );

          state.currentCity.offers = updateOffers(state.currentCity.offers);
          state.allOffers = updateOffers(state.allOffers);
          state.nearbyOffers = updateOffers(state.nearbyOffers);

          if (state.currentOffer?.id === updatedOffer.id) {
            state.currentOffer.isFavorite = updatedOffer.isFavorite;
          }
        }
      )
      .addCase(changeFavoriteStatus.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })

      .addCase(fetchFavorites.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<OffersType[]>) => {
          state.status = RequestStatus.Success;
          state.favorites = action.payload;
        }
      )
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
});

export const { setCurrentCity, setSelectedPoint } = citiesSlice.actions;

export default citiesSlice.reducer;
