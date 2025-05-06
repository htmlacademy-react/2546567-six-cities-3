import { useSelector } from 'react-redux';
import LocationListMain from '../../components/location-list-main';
import CardList from './card-list';
import MapComponent from '../../components/map-component';
import { RootState, useAppDispatch } from '../../store.ts';
import { useEffect } from 'react';
import { fetchAllOffers } from '../../reducer/cities/cities-slice.ts';
import { RequestStatus } from '../../components/const.ts';
import Loading from '../../components/loading.tsx';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  const selectedPoint = useSelector(
    (state: RootState) => state.cities.selectedPoint
  );
  const status = useSelector((state: RootState) => state.cities.status);

  // Выполняем запрос при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

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
              className={'cities__map'}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
