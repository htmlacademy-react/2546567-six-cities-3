import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function OfferHost(): JSX.Element {
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );
  return (
    <div className="offer__description">
      <p className="offer__text">
        {`Regular ${currentCity.name} offer description`}
      </p>
    </div>
  );
}
export default OfferHost;
