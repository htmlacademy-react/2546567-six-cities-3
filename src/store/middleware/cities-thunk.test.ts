import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import {
  fetchAllOffers,
  fetchCurrentOffer,
  fetchNearbyOffers,
  fetchComments,
  sendComment,
  fetchFavorites,
} from '../middleware/cities-thunk';
import { API } from '../../services/api';
import type { NewComment, ReviewType } from '../slices/cities-slice';
import { CurrentOfferType, OffersType } from '../../utils/type';
import { CitiesEnum } from '../../utils/const';

vi.mock('../../services/api', () => ({
  API: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockAPI = {
  get: vi.mocked(API.get) as Mock,
  post: vi.mocked(API.post) as Mock,
};

const mockOffer: OffersType = {
  id: '1',
  title: 'Test Offer',
  previewImage: '',
  pictures: [],
  description: {
    placeCardType: 'Apartment',
    maxAdults: 2,
    bedrooms: 1,
  },
  isPremium: false,
  isFavorite: false,
  city: {
    name: CitiesEnum.Paris,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    offers: [],
  },
  goods: ['Wi-Fi'],
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  price: 100,
  rating: 4.5,
  type: 'apartment',
};

const mockCurrentOffer: CurrentOfferType = {
  id: '1',
  title: 'Test Current Offer',
  bedrooms: 1,
  city: {
    name: CitiesEnum.Paris,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    offers: [],
  },
  description: 'Test description',
  goods: ['Wi-Fi'],
  host: {
    isPro: true,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  images: ['https://example.com/image.jpg'],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  maxAdults: 2,
  price: 200,
  rating: 4.8,
  type: 'apartment',
};

const mockReview: ReviewType = {
  id: '1',
  comment: 'Test comment',
  date: new Date('2024-01-01'),
  user: {
    isPro: true,
    name: 'Jane Smith',
    avatarUrl: 'https://example.com/avatar2.jpg',
  },
  rating: 5,
};

describe('Cities thunks', () => {
  const getExtra = () => API;
  const mockThunkArgs = (extra = getExtra()) => ({
    dispatch: vi.fn(),
    getState: vi.fn(),
    extra,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchAllOffers', () => {
    it('should fetch all offers successfully', async () => {
      mockAPI.get.mockResolvedValue({ data: [mockOffer] });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchAllOffers()(dispatch, getState, extra);

      expect(mockAPI.get).toHaveBeenCalledWith('/offers');
      expect(result.payload).toEqual([mockOffer]);
    });

    it('should handle fetch error', async () => {
      mockAPI.get.mockRejectedValue(new Error('Network Error'));
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchAllOffers()(dispatch, getState, extra);

      expect(result.payload).toBe('Failed to load offers');
    });
  });

  describe('fetchCurrentOffer', () => {
    it('should fetch current offer successfully', async () => {
      const offerId = '1';
      mockAPI.get.mockResolvedValue({ data: mockCurrentOffer });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchCurrentOffer(offerId)(
        dispatch,
        getState,
        extra
      );

      expect(mockAPI.get).toHaveBeenCalledWith(`/offers/${offerId}`);
      expect(result.payload).toEqual(mockCurrentOffer);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should fetch nearby offers successfully', async () => {
      const offerId = '1';
      mockAPI.get.mockResolvedValue({ data: [mockOffer] });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchNearbyOffers(offerId)(
        dispatch,
        getState,
        extra
      );

      expect(mockAPI.get).toHaveBeenCalledWith(`/offers/${offerId}/nearby`);
      expect(result.payload).toEqual([mockOffer]);
    });
  });

  describe('fetchComments', () => {
    it('should fetch comments successfully', async () => {
      const offerId = '1';
      mockAPI.get.mockResolvedValue({ data: [mockReview] });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchComments(offerId)(dispatch, getState, extra);

      expect(mockAPI.get).toHaveBeenCalledWith(`/comments/${offerId}`);
      expect(result.payload).toEqual([mockReview]);
    });
  });

  describe('sendComment', () => {
    it('should send comment successfully', async () => {
      const payload: NewComment = {
        offerId: '1',
        comment: 'Test comment',
        rating: 5,
      };
      mockAPI.post.mockResolvedValue({ data: mockReview });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await sendComment(payload)(dispatch, getState, extra);

      expect(mockAPI.post).toHaveBeenCalledWith(
        `/comments/${payload.offerId}`,
        { comment: payload.comment, rating: Number(payload.rating) }
      );
      expect(result.payload).toEqual(mockReview);
    });
  });

  describe('fetchFavorites', () => {
    it('should fetch favorites successfully', async () => {
      mockAPI.get.mockResolvedValue({ data: [mockOffer] });
      const { dispatch, getState, extra } = mockThunkArgs();

      const result = await fetchFavorites()(dispatch, getState, extra);

      expect(mockAPI.get).toHaveBeenCalledWith('/favorite');
      expect(result.payload).toEqual([mockOffer]);
    });
  });
});
