import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { type OffersType } from '../utils/type';
import MemorizedCard from './card';
import { useAppDispatch } from '../store';
import { CitiesEnum } from '../utils/const';

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock('../store', () => ({
  useAppDispatch: vi.fn(),
  setSelectedPoint: vi.fn(),
}));

vi.mock('./BookmarkButton', () => ({
  BookmarkButton: vi.fn().mockImplementation(() => <button>Bookmark</button>),
}));

const mockOffer: OffersType = {
  id: '1',
  title: 'Luxury Apartment',
  price: 200,
  rating: 4.8,
  type: 'apartment',
  previewImage: 'image.jpg',
  city: {
    name: CitiesEnum.Amsterdam,
    location: { latitude: 52.374, longitude: 4.8897, zoom: 12 },
    offers: [],
  },
  location: { latitude: 52.374, longitude: 4.8897, zoom: 12 },
  isPremium: true,
  isFavorite: false,
  pictures: [],
  description: {
    placeCardType: '',
    maxAdults: 0,
    bedrooms: 0,
  },
  goods: [],
};

describe('Card component', () => {
  const mockDispatch = vi.fn();
  const mockedUseAppDispatch = vi.mocked(useAppDispatch);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
  });

  it('renders basic offer information correctly', () => {
    render(<MemorizedCard offer={mockOffer} />);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockOffer.previewImage
    );
  });
});
