import { useSelector } from 'react-redux';
import FavoriteCard from './favorite-card.tsx';
import { RootState, useAppDispatch } from '../../store/index.ts';
import { useEffect } from 'react';
import { fetchFavorites } from '../../store/middleware/cities-thunk.ts';
import { OffersType } from '../../utils/type.ts';
import { useNavigate } from 'react-router-dom';
import { setCurrentCity } from '../../store/slices/cities-slice.ts';
import Footer from '../../components/footer.tsx';
import FavoritesEmpty from './favorites-empty.tsx';
import { AuthorizationStatus, CITIES, CitiesEnum } from '../../utils/const.ts';
// import { fetchLogin } from '../../store/middleware/user-thunk.ts';

function FavoritePage() {
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: RootState) => state.cities.favorites);
  const allOffers = useSelector((state: RootState) => state.cities.allOffers);
  const navigate = useNavigate();

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch]);

  const groupedFavorites = favorites.reduce<Record<string, OffersType[]>>(
    (acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    },
    {}
  );

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favorites.length === 0 ? (
              <FavoritesEmpty />
            ) : (
              <ul className="favorites__list">
                {Object.entries(groupedFavorites).map(([cityName, offers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span
                            onClick={(evt) => {
                              evt.preventDefault();
                              const currentOffers = allOffers.filter(
                                (item) =>
                                  item.city.name === (cityName as CitiesEnum)
                              );
                              const currentCity = CITIES.find(
                                (city) => city.name === (cityName as CitiesEnum)
                              );

                              if (currentCity) {
                                const newCity = {
                                  ...currentCity,
                                  offers: currentOffers,
                                };
                                dispatch(setCurrentCity(newCity));
                                navigate('/');
                              }
                            }}
                          >
                            {cityName}
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offers.map((offer) => (
                        <FavoriteCard key={offer.id} offer={offer} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FavoritePage;
