import { CardType } from '../utils/type';

export const IS_AUTH = true;

export const CARDS: CardType[] = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    description: {
      priceValue: 120,
      rating: 4,
      placeCardType: 'Apartment',
      maxAdults: 4,
      bedrooms: 2,
    },
    placeCardName: 'Beautiful &amp; luxurious apartment at great location',
    isFavorite: false,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: true,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
    ],
  },

  {
    id: 2,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/studio-01.jpg'],
    description: {
      priceValue: 80,
      rating: 4,
      maxAdults: 1,
      placeCardType: 'Room',
      bedrooms: 1,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating'],
  },
  {
    id: 3,
    img: 'img/apartment-02.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg'],
    description: {
      priceValue: 132,
      rating: 4,
      maxAdults: 3,
      placeCardType: 'Apartment',
      bedrooms: 2,
    },
    placeCardName: 'Canal View Prinsengracht',
    isFavorite: false,
    city: {
      name: 'Brussels',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: ['Wi-Fi', 'Towels', 'Heating', 'Coffee machine', 'Baby seat'],
  },
  {
    id: 4,
    img: 'img/apartment-03.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    description: {
      priceValue: 180,
      rating: 5,
      maxAdults: 2,
      placeCardType: 'Apartment',
      bedrooms: 3,
    },
    placeCardName: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: true,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
    ],
  },
  {
    id: 5,
    img: 'img/room.jpg',
    pictures: ['img/room.jpg', 'img/studio-01.jpg'],
    description: {
      priceValue: 90,
      rating: 4,
      maxAdults: 1,
      placeCardType: 'Room',
      bedrooms: 1,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: [
      'Wi-Fi',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
  },

  {
    id: 6,
    img: 'img/room.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    description: {
      priceValue: 100,
      rating: 4,
      maxAdults: 2,
      placeCardType: 'Room',
      bedrooms: 2,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: [
      'Wi-Fi',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
    ],
  },
];

export const getRaiting = (starsCount: number) => {
  const percents = starsCount * 20;
  return `${percents}%`;
};

export const GOODS: string[] = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cabel TV',
  'Fridge',
];
