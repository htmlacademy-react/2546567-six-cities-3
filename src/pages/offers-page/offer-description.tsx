import { useSelector } from 'react-redux';
import Loading from '../../components/loading';
import { RootState, useAppDispatch } from '../../store';
import { changeFavoriteStatus } from '../../store/middleware/cities-thunk';
import { getRating } from '../../utils/helpers';
import { CurrentOfferType } from '../../utils/type';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { useNavigate } from 'react-router-dom';

type OfferDescriptionProps = {
  currentOffer: CurrentOfferType;
};

function OfferDescription({
  currentOffer,
}: OfferDescriptionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  if (!currentOffer) {
    return <Loading />;
  }

  return (
    <>
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{currentOffer.title}</h1>
        <button
          className={`offer__bookmark-button ${
            currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''
          } button`}
          type="button"
          onClick={() => {
            if (authorizationStatus === AuthorizationStatus.Auth) {
              const payload = {
                offerId: currentOffer.id,
                status: currentOffer.isFavorite ? 0 : 1,
              };
              dispatch(changeFavoriteStatus(payload));
            } else {
              navigate(AppRoute.Login);
            }
          }}
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: getRating(currentOffer.rating) }}></span>
          <span className="visually-hidden">{currentOffer.rating}</span>
        </div>
        <span className="offer__rating-value rating__value">
          {currentOffer.rating.toFixed(1)}
        </span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {currentOffer.type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {currentOffer.bedrooms} Bedrooms
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {currentOffer.maxAdults} adults
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{currentOffer.price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

export default OfferDescription;
