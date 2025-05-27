import { useParams } from 'react-router-dom';
import Card from '../../components/card';
import OfferGallery from './offer-gallery.tsx';
import OfferReviewsList from './offers-reviews-list';
import OfferDescription from './offer-description';
import MapComponent from '../../components/map-component';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index.ts';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../utils/const.ts';
import OfferReviewForm from '../../components/offer-review-form.tsx';
import {
  fetchComments,
  fetchCurrentOffer,
  fetchNearbyOffers,
} from '../../store/middleware/cities-thunk.ts';
import { setSelectedPoint } from '../../store/slices/cities-slice.ts';
import { OffersType } from '../../utils/type.ts';

function OfferPage() {
  const dispatch = useAppDispatch();
  const params = useParams();

  if (!params.id) {
    window.location.href = '/404';
  }

  const currentOffer = useSelector(
    (state: RootState) => state.cities.currentOffer
  );
  const selectedPoint = useSelector(
    (state: RootState) => state.cities.selectedPoint
  );
  const nearbyOffers = useSelector(
    (state: RootState) => state.cities.nearbyOffers
  );
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  const comments = useSelector((state: RootState) => state.cities.comments);

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (currentOffer) {
      dispatch(setSelectedPoint(currentOffer as unknown as OffersType));
    }

    return () => {
      dispatch(setSelectedPoint(null));
    };
  }, [currentOffer, dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCurrentOffer(params.id));
      dispatch(fetchNearbyOffers(params.id));
      dispatch(fetchComments(params.id));
    }
  }, [dispatch, params.id]);

  if (!currentOffer) {
    return null;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery pictures={currentOffer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <OfferDescription currentOffer={currentOffer} />
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods?.map((offer: string) => (
                  <li className="offer__inside-item" key={offer}>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div
                  className={`offer__avatar-wrapper user__avatar-wrapper ${
                    currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                  }`}
                >
                  <img
                    className="offer__avatar user__avatar"
                    src={currentOffer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {currentOffer.host.name}
                </span>
                {currentOffer.host.isPro && (
                  <span className="offer__user-status">Pro</span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {`Regular ${currentCity.name} offer description`}
                </p>
                <p className="offer__text">{currentOffer.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot;{' '}
                <span className="reviews__amount">{comments.length}</span>
              </h2>
              <OfferReviewsList />
              {isAuth && <OfferReviewForm id={currentOffer.id} />}
              {!isAuth && (
                <p className="reviews__subtitle">
                  ...Пожалуйста, авторизуйтесь...
                </p>
              )}
            </section>
          </div>
        </div>
        <MapComponent
          className={'offer__map'}
          city={currentCity}
          selectedPoint={selectedPoint}
          nearbyOffers={[
            currentOffer as unknown as OffersType,
            ...nearbyOffers,
          ]}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighborhood
          </h2>
          <div className="near-places__list places__list">
            {nearbyOffers.map((item) => (
              <Card key={item.id} offer={item} isNearCard />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
