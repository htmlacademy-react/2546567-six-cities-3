import { useParams } from 'react-router-dom';
import Card from '../../components/card';
import OfferGallery from '../favorite-page/offer-gallery';
import OfferReviewsList from './offers-reviews-list';
import { CardType } from '../../utils/type';
import OfferHost from './offer-host';
import OfferDescription from './offer- description';
import { IS_AUTH } from '../../mocks/mocks';
import OfferReviews from '../../components/offer-reviews';

function OfferPage({ cards }: { cards: CardType[] }) {
  const params = useParams()
  const currentCard = cards.find((item: CardType) => item.id === Number(params.id));

  if (!currentCard) {
    return null
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery pictures={currentCard.pictures} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <OfferDescription description={currentCard.description} />
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentCard.goods.map((offer: string) => (
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
                Reviews &middot; <span className="reviews__amount">1</span>
              </h2>
              <OfferReviewsList />
              {IS_AUTH &&
                <OfferReviews />
              }
              {!IS_AUTH &&
                <p className="reviews__subtitle">...Пожалуйста, авторизуйтесь...</p>
              }
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
            <Card card={cards[0]} />
            <Card card={cards[2]} />
            <Card card={cards[4]} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage
