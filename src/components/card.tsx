import { Link, useNavigate } from 'react-router-dom';
import { OffersType } from '../utils/type';
import { AppRoute, AuthorizationStatus } from '../utils/const';
import { setSelectedPoint } from '../store/slices/cities-slice';
import { changeFavoriteStatus } from '../store/middleware/cities-thunk';
import { RootState, useAppDispatch } from '../store';
import { memo } from 'react';
import { getRating } from '../utils/helpers';
import { useSelector } from 'react-redux';

type CardPropsType = {
  offer: OffersType;
  isNearCard?: boolean;
};

function Card({ offer, isNearCard }: CardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  const currentOffer = useSelector(
    (state: RootState) => state.cities.currentOffer
  );

  return (
    <article
      className={`${
        isNearCard ? 'near-places__card' : 'cities__card'
      } place-card`}
      onMouseEnter={() => {
        dispatch(setSelectedPoint(offer));
      }}
      onMouseLeave={() => {
        dispatch(
          setSelectedPoint((currentOffer as unknown as OffersType) || null)
        );
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
          <button
            className={`place-card__bookmark-button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            onClick={() => {
              const payload = {
                offerId: offer.id,
                status: offer.isFavorite ? 0 : 1,
              };
              if (authorizationStatus === AuthorizationStatus.Auth) {
                dispatch(changeFavoriteStatus(payload));
              } else {
                navigate(AppRoute.Login);
              }
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
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemorizedCard = memo(Card);
export default MemorizedCard;
