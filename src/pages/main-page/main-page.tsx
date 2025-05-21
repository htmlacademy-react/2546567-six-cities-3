import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index.ts';
import { useEffect } from 'react';
import { fetchAllOffers } from '../../store/middleware/cities-thunk.ts';
import MainEmpty from './main-empty.tsx';
import MainContent from './main-content.tsx';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  const hasOffers = currentCity.offers.length > 0;

  return (
    <main className="page__main page__main--index">
      {hasOffers ? <MainContent /> : <MainEmpty />}
    </main>
  );
}

export default MainPage;
