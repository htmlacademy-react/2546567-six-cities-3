import { useMemo, useState } from 'react';
import Card from '../../components/card';

import { SortOption } from '../../components/const';
import Sort from '../../components/sort';
import { useSelector } from 'react-redux';
import { RootState } from '../../store.ts';

function CardList(): JSX.Element {
  const offers = useSelector(
    (state: RootState) => state.cities.currentCity.offers
  );
  const [activeSort, setActiveSort] = useState<SortOption>(SortOption.Popular);

  const sortedOffers = useMemo(() => {
    switch (activeSort) {
      case SortOption.PriceLowToHigh:
        return [...offers].sort((a, b) => a.price - b.price);
      case SortOption.PriceHighToLow:
        return [...offers].sort((a, b) => b.price - a.price);
      case SortOption.TopRatedFirst:
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [offers, activeSort]);

  const onSortChange = (option: SortOption) => {
    setActiveSort(option);
  };

  return (
    <>
      <Sort active={activeSort} handleSort={onSortChange} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((card) => (
          <Card offer={card} key={card.id} />
        ))}
      </div>
    </>
  );
}
export default CardList;
