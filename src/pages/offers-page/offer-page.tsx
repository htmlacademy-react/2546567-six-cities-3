import { useParams } from 'react-router-dom';
import Card from '../../components/card';
import OfferGallery from '../favorite-page/offer-gallery';
import OfferReviewsList from './offers-reviews-list';
import { OffersType } from '../../utils/type';
import OfferHost from './offer-host';
import OfferDescription from './offer-description';
import MapComponent from '../../components/map-component';
import getNearOffers from '../../utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
import { REVIEWS_MOCK } from '../../mocks/mocks.ts';

function OfferPage() {
  const offers = useSelector(
    (state: RootState) => state.cities.currentCity.offers
  );
  const params = useParams();
  const currentOffer = offers.find(
    (item: OffersType) => item.id === Number(params.id)
  );

  if (!currentOffer) {
    return null;
  }

  const nearCards = getNearOffers(currentOffer, offers);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery pictures={currentOffer.pictures} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <OfferDescription currentOffer={currentOffer} />
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((offer: string) => (
                  <li className="offer__inside-item" key={offer}>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src="img/avatar-angelina.jpg"
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">Angelina</span>
                <span className="offer__user-status">Pro</span>
              </div>
              <OfferHost />
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot;{' '}
                <span className="reviews__amount">{REVIEWS_MOCK.length}</span>
              </h2>
              <OfferReviewsList />
              {/* {IS_AUTH && <OfferReviews />}
              {!IS_AUTH && (
                <p className="reviews__subtitle">
                  ...Пожалуйста, авторизуйтесь...
                </p>
              )} */}
            </section>
          </div>
        </div>
        <MapComponent
          className={'offer__map'}
          city={currentOffer.city}
          selectedPoint={currentOffer}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighborhood
          </h2>
          <div className="near-places__list places__list">
            {nearCards.map((item) => (
              <Card key={item.id} offer={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
