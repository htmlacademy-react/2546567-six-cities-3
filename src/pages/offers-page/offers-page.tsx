import Card from '../../components/card';
import HeaderMain from '../../components/header-main';
import OffersReviewsForm from '../../components/offers-reviews-form';

import { CARDS, OFFERS } from '../../utils/mocks';
import OffersGallery from '../favorite-page/offers-gallery';
import OffersDescription from './offers-description';
import OffersName from './offers-name';
import OffersReviewsList from './offers-reviews-list';

export const OffersPage = () => (
  <div className="page">
    <HeaderMain />
    <main className="page__main page__main--offer">
      <section className="offer">
        <OffersGallery />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <OffersName />
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {OFFERS.map((offer: string) => (
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
              <OffersDescription />
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">1</span>
              </h2>
              <OffersReviewsList />
              <OffersReviewsForm />
            </section>
          </div>
        </div>
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <Card card={CARDS[0]} />
            <Card card={CARDS[2]} />
            <Card card={CARDS[4]} />
          </div>
        </section>
      </div>
    </main>
  </div>
);
