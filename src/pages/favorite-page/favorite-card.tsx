import { getRaiting } from '../../mocks/mocks';
import { CardType } from '../../utils/type';

type FavoriteCardPropsType = {
  card: CardType;
};

function FavoriteCard({ card }: FavoriteCardPropsType): JSX.Element {
  return (
    <article className="favorites__card place-card" key={card.id}>
      {card.premiumMark === true && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={card.img}
            width="150"
            height="110"
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.description.priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRaiting(card.description.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{card.placeCardName}</a>
        </h2>
        <p className="place-card__type">{card.description.placeCardType}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
