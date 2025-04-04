
import LocationListMain from '../../components/location-list-main';
import MapMain from '../../components/map-main';
import { CardType } from '../../utils/type';
import CardList from './card-list';

const placesOption: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

type MainPageProps = {
  offersCount: number;
  cards: CardType[];
};


function MainPage({ offersCount, cards }: MainPageProps): JSX.Element {
  return (
    <>
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
              <CardList cards={cards} />
            </section>
            <div className="cities__right-section">
              <MapMain />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
