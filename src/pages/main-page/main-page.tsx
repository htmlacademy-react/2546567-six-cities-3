import { useSelector } from 'react-redux';
import LocationListMain from '../../components/location-list-main';
import { RootState } from '../../reducer/reducer';
import CardList from './card-list';
import MapComponent from '../../components/map-component';

function MainPage(): JSX.Element {
  const currentOffers = useSelector((state: RootState) => state.cities.offers);
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  const selectedPoint = useSelector(
    (state: RootState) => state.cities.selectedPoint
  );

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
              {currentOffers.length} place{currentOffers.length > 1 && 's'} to
              stay in {currentCity.name}
            </b>

            <CardList offers={currentOffers} />
          </section>
          <div className="cities__right-section">
            <MapComponent
              city={currentCity}
              offers={currentOffers}
              selectedPoint={selectedPoint}
              className={'cities__map'}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
