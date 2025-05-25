import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Добавляем обертку
import Card from './card';
import { AppRoute, CitiesEnum } from '../utils/const';
import { OffersType } from '../utils/type';

// Мокаем зависимости
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

vi.mock('../store', () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock('../store/middleware/cities-thunk');

describe('Component: Card', () => {
  const mockOffer: OffersType = {
    id: '1',
    title: 'Test Offer',
    previewImage: 'test-image.jpg',
    price: 100,
    rating: 4,
    isFavorite: false,
    premiumMark: true,
    description: {
      placeCardType: 'Apartment',
      maxAdults: 0,
      bedrooms: 0,
    },
    pictures: [],
    city: {
      name: CitiesEnum.Paris,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
      offers: [],
    },
    goods: [],
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    type: 'apartment', // Добавляем обязательное поле
  };

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        {' '}
        {/* Добавляем обертку */}
        <Card offer={mockOffer} />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `${AppRoute.Offers}/1`
    );
  });

  it('should render active favorite button when isFavorite is true', () => {
    const offerWithFavorite = { ...mockOffer, isFavorite: true };
    render(
      <MemoryRouter>
        {' '}
        {/* Добавляем обертку */}
        <Card offer={offerWithFavorite} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
  });
});
