import { CardType } from './type';

export const CARDS: CardType[] = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    rating: 4,
    premiumMark: true,
    priceValue: '120',
    placeCardName: 'Beautiful &amp; luxurious apartment at great location',
    placeCardType: 'Apartment',
    isFavorite: false,
  },
  {
    id: 2,
    img: 'img/apartment-01.jpg',
    rating: 4,
    premiumMark: false,
    priceValue: '80',
    placeCardName: 'Wood and stone place',
    placeCardType: 'Room',
    isFavorite: true,
  },
  {
    id: 3,
    img: 'img/apartment-02.jpg',
    rating: 4,
    premiumMark: false,
    priceValue: '132',
    placeCardName: 'Canal View Prinsengracht',
    placeCardType: 'Apartment',
    isFavorite: false,
  },
  {
    id: 4,
    img: 'img/apartment-03.jpg',
    rating: 5,
    premiumMark: true,
    priceValue: '180',
    placeCardName: 'Nice, cozy, warm big bed apartment',
    placeCardType: 'Apartment',
    isFavorite: true,
  },
  {
    id: 5,
    img: 'img/room.jpg',
    rating: 4,
    premiumMark: false,
    priceValue: '80',
    placeCardName: 'Wood and stone place',
    placeCardType: 'Room',
    isFavorite: true,
  },
];

export const getRaiting = (starsCount: number) => {
  const percents = starsCount * 20;
  return `${percents}%`;
};

export const OFFERS: string[] = [
  'Wi-Fi',
  ' Washing machine',
  ' Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cabel TV',
  'Fridge',
];
