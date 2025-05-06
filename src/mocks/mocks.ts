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
