import { useState } from 'react';
import Card from '../../components/card';
import { OffersType } from '../../utils/type';

function CardList({ cards }: { cards: OffersType[] }): JSX.Element {
  const [, setActiveCards] = useState<OffersType | null>(null);
  const handleHover = (card?: OffersType) => {
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
