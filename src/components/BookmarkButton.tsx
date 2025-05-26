import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OffersType } from '../utils/type';
import { RootState, useAppDispatch } from '../store';
import { AppRoute, AuthorizationStatus } from '../utils/const';
import { changeFavoriteStatus } from '../store/middleware/cities-thunk';

type BookmarkButtonProps = {
  offer: OffersType;
};

export const BookmarkButton = ({ offer }: BookmarkButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  return (
    <button
      className={`place-card__bookmark-button ${
        offer.isFavorite ? 'place-card__bookmark-button--active' : ''
      } button`}
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
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
  );
};
