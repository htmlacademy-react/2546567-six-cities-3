import { useSelector } from 'react-redux';
import { placesOption } from '../../components/const';
import LocationListMain from '../../components/location-list-main';
import { OFFERS } from '../../mocks/mocks';
import { MainPageProps } from '../../utils/type';
import { RootState } from '../../reducer/reducer';
import CardList from './card-list';
import MapComponent from '../../components/map-component';

function MainPage({ offersCount }: MainPageProps): JSX.Element {
  const offers = useSelector((state: RootState) => state.cities.offers);

  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );

  // const currentOffers = OFFERS.filter(
  //   (card) => card.city.name === currentCity.name
  // );

  // const isEmpty = currentOffers.length === 0;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationListMain />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offersCount} places to stay in Amsterdam
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                {placesOption.map((place) => (
                  <li key={place} className="places__option" tabIndex={0}>
                    {place}
                  </li>
                ))}
              </ul>
            </form>
            <CardList cards={offers} />
          </section>
          <div className="cities__right-section">
            <MapComponent
              city={currentCity}
              offers={offers}
              selectedPoint={offers[0]}
              className={'cities__map'}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
