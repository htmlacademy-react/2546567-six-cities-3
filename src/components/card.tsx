import { Link } from 'react-router-dom';
import { getRating } from '../mocks/mocks';
import { OffersType } from '../utils/type';
import { AppRoute } from './const';

type CardPropsType = {
  card: OffersType;
  handleHover?: (card?: OffersType) => void;
};

function Card({ card, handleHover }: CardPropsType): JSX.Element {
  const handleMouseOn = () => {
    if (handleHover) {
      handleHover(card);
    }
  };

  const handleMouseOff = () => {
    if (handleHover) {
      handleHover();
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
      key={card.id}
    >
      {card.premiumMark === true && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={card.img}
          width="260"
          height="200"
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{card.description.priceValue}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">Rating</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(card.description.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${card.id}`}>{card.placeCardName}</Link>
        </h2>
        <p className="place-card__type">{card.description.placeCardType}</p>
      </div>
    </article>
  );
}
export default Card;
