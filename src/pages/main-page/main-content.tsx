import { useSelector } from 'react-redux';
import '../../styles.css';
import { RootState } from '../../store';
import { RequestStatus } from '../../mocks/const';
import Loading from '../../components/loading';
import CardList from './card-list';
import MapComponent from '../../components/map-component';
import LocationListMain from '../../components/location-list-main';

function MainContent(): JSX.Element {
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  const selectedPoint = useSelector(
    (state: RootState) => state.cities.selectedPoint
  );
  const status = useSelector((state: RootState) => state.cities.status);
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationListMain />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {currentCity.offers.length} place
              {currentCity.offers.length > 1 && 's'} to stay in{' '}
              {currentCity.name}
            </b>
            {status === RequestStatus.Loading && <Loading />}
            {status !== RequestStatus.Loading && <CardList />}
          </section>
          <div className="cities__right-section">
            <MapComponent
              city={currentCity}
              selectedPoint={selectedPoint}
              className="cities__map"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
