import { memo, useMemo, useState } from 'react';
import Card from '../../components/card';

import { SortOption } from '../../utils/const.ts';
import Sort from '../../components/sort';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts';

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

  const handleSort = (option: SortOption) => {
    setActiveSort(option);
  };

  return (
    <>
      <Sort active={activeSort} onSort={handleSort} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((card) => (
          <Card offer={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

const MemorizedCardList = memo(CardList);
export default MemorizedCardList;
