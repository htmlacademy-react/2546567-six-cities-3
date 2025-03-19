import { CARDS } from '../../utils/mocks';
import Card from '../../components/card';

function CardListMain(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {CARDS.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  );
}
export default CardListMain;
