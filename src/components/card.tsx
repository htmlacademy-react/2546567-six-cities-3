import { Link } from 'react-router-dom';
import { OffersType } from '../utils/type';
import { AppRoute } from '../utils/const';
import { setSelectedPoint } from '../store/slices/cities-slice';
import { useAppDispatch } from '../store';
import { memo } from 'react';
import { getRating } from '../utils/helpers';
import { BookmarkButton } from './BookmarkButton';

type CardPropsType = {
  offer: OffersType;
  isNearCard?: boolean;
};

function Card({ offer, isNearCard }: CardPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <article
      className={`${
        isNearCard ? 'near-places__card' : 'cities__card'
      } place-card`}
      onMouseEnter={() => {
        if (!isNearCard) {
          dispatch(setSelectedPoint(offer));
        }
      }}
      onMouseLeave={() => {
        if (!isNearCard) {
          dispatch(setSelectedPoint(null));
        }
      }}
      key={offer.id}
    >
      {offer.isPremium === true && (
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
          <BookmarkButton offer={offer} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemorizedCard = memo(Card);
export default MemorizedCard;
