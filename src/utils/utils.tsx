import { CardType } from './type';

const MAX_NEAR_OFFERS = 3;

function getNearOffers(card: CardType, cards: CardType[]) {
  const filteredCards = cards.filter((item) => {
    if (item.city.name === card.city.name) {
      return item;
    }
  });
  return filteredCards.slice(0, MAX_NEAR_OFFERS);
}

export default getNearOffers;
