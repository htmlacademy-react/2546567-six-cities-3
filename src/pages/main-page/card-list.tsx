import { useState } from 'react';
import Card from '../../components/card';
import { CardType } from '../../utils/type';

function CardList({ cards }: { cards: CardType[] }): JSX.Element {
  const [, setActiveCards] = useState<CardType | null>(null);
  const handleHover = (card?: CardType) => {
    setActiveCards(card || null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {cards.map((card) => (
        <Card card={card} key={card.id} handleHover={handleHover} />
      ))}
    </div>
  );
}
export default CardList;
