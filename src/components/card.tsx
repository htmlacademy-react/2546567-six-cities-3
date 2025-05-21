import { Link } from 'react-router-dom';
import { OffersType } from '../utils/type';
import { AppRoute } from './const';
import { setSelectedPoint } from '../store/slices/cities-slice';
import { getRating } from '../mocks/mocks';
import { changeFavoriteStatus } from '../store/middleware/cities-thunk';
import { useAppDispatch } from '../store';
import { memo } from 'react';

type CardPropsType = {
  offer: OffersType;
};

function Card({ offer }: CardPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => {
        dispatch(setSelectedPoint(offer));
      }}
      onMouseLeave={() => {
        dispatch(setSelectedPoint(null));
      }}
      key={offer.id}
    >
      {offer.premiumMark === true && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={offer.previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            onClick={() => {
              const payload = {
                offerId: offer.id,
                status: offer.isFavorite ? 0 : 1,
              };
              dispatch(changeFavoriteStatus(payload));
            }}
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
            <span style={{ width: getRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.description?.placeCardType}</p>
      </div>
    </article>
  );
}

const MemorizedCard = memo(Card);
export default MemorizedCard;
