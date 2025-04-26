import { ReviewType as ReviewType } from '../utils/type';

export const IS_AUTH = true;

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
