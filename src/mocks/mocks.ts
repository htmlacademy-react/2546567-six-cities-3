import { CitiesEnum } from '../components/const';
import { OffersType, ReviewType as ReviewType } from '../utils/type';

export const IS_AUTH = true;

export const OFFERS: OffersType[] = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    price: 180,
    rating: 4,
    description: {
      maxAdults: 2,
      placeCardType: 'Apartment',
      bedrooms: 3,
    },
    placeCardName: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    city: {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
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
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 5,
    },
  },
  {
    id: 2,
    img: 'img/apartment-02.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    price: 150,
    rating: 3,
    description: {
      maxAdults: 2,
      placeCardType: 'Apartment',
      bedrooms: 3,
    },
    placeCardName: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    city: {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
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
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 5,
    },
  },
  {
    id: 3,
    img: 'img/apartment-03.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    price: 210,
    rating: 5,
    description: {
      maxAdults: 2,
      placeCardType: 'Apartment',
      bedrooms: 3,
    },
    placeCardName: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    city: {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 5,
      },
    },
    premiumMark: false,
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
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 5,
    },
  },
  {
    id: 4,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    price: 90,
    rating: 3,
    description: {
      maxAdults: 2,
      placeCardType: 'Apartment',
      bedrooms: 3,
    },
    placeCardName: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    city: {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
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
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 5,
    },
  },
  {
    id: 5,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg'],
    price: 120,
    rating: 4,
    description: {
      placeCardType: 'Apartment',
      maxAdults: 4,
      bedrooms: 2,
    },
    placeCardName: 'Beautiful &amp; luxurious apartment at great location',
    isFavorite: false,
    city: {
      name: CitiesEnum.Paris,
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
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
  },

  {
    id: 6,
    img: 'img/apartment-01.jpg',
    pictures: ['img/room.jpg', 'img/studio-01.jpg'],
    price: 80,
    rating: 4,
    description: {
      maxAdults: 1,
      placeCardType: 'Room',
      bedrooms: 1,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: CitiesEnum.Cologne,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating'],
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 5,
    },
  },
  {
    id: 7,
    img: 'img/apartment-02.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg'],
    price: 132,
    rating: 4,
    description: {
      maxAdults: 3,
      placeCardType: 'Apartment',
      bedrooms: 2,
    },
    placeCardName: 'Canal View Prinsengracht',
    isFavorite: false,
    city: {
      name: CitiesEnum.Brussels,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 5,
      },
    },
    premiumMark: false,
    goods: ['Wi-Fi', 'Towels', 'Heating', 'Coffee machine', 'Baby seat'],
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },

  {
    id: 8,
    img: 'img/room.jpg',
    pictures: ['img/room.jpg', 'img/studio-01.jpg'],
    price: 90,
    rating: 4,
    description: {
      maxAdults: 1,
      placeCardType: 'Room',
      bedrooms: 1,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: CitiesEnum.Hamburg,
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
      'Cable TV',
      'Fridge',
    ],
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },

  {
    id: 9,
    img: 'img/room.jpg',
    pictures: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    price: 100,
    rating: 4,
    description: {
      maxAdults: 2,
      placeCardType: 'Room',
      bedrooms: 2,
    },
    placeCardName: 'Wood and stone place',
    isFavorite: true,
    city: {
      name: CitiesEnum.Dusseldorf,
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
      'Cable TV',
    ],
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
];

export const getRating = (starsCount: number) => {
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
  'Cable TV',
  'Fridge',
];

export const REVIEWS_MOCK: ReviewType[] = [
  {
    id: 0,
    name: 'Max',
    rating: 4,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  },
  {
    id: 1,
    name: 'Jack',
    rating: 5,
    text: 'everything is beautiful. I recommend',
  },
];
