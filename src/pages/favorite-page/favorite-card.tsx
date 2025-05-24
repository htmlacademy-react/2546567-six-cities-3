import { getRating } from '../../mocks/mocks';
import { useAppDispatch } from '../../store';
import { changeFavoriteStatus } from '../../store/middleware/cities-thunk';

import { OffersType } from '../../utils/type';

type FavoriteCardPropsType = {
  offer: OffersType;
};

function FavoriteCard({ offer }: FavoriteCardPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article className="favorites__card place-card" key={offer.id}>
      {offer.premiumMark === true && (
        <div className="place-card__mark">
          <span>{offer.premiumMark ? 'Premium' : ''}</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={() => {
              const payload = {
                offerId: offer.id,
                status: offer.isFavorite ? 0 : 1,
              };
              dispatch(changeFavoriteStatus(payload));
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
