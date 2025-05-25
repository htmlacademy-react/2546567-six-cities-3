import classNames from 'classnames';
import { AppRoute, CITIES } from '../utils/const.ts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCity } from '../store/slices/cities-slice.ts';
import { RootState } from '../store/index.ts';

function LocationListMain(): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector(
    (state: RootState) => state.cities.currentCity
  );

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city.name}>
            <Link
              className={classNames('locations__item-link', 'tabs__item', {
                'tabs__item--active': currentCity.name === city.name,
              })}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(setCurrentCity(city));
              }}
              to={AppRoute.Root}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default LocationListMain;
