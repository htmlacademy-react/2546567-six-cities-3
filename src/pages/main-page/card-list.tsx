import { useEffect, useState } from 'react';
import Card from '../../components/card';
import { OffersType } from '../../utils/type';
import { SortOption } from '../../components/const';
import Sort from '../../components/sort';

function CardList({ offers }: { offers: OffersType[] }): JSX.Element {
  const [sortedOffers, setSortedOffers] = useState<OffersType[]>(offers);
  const [activeSort, setActiveSort] = useState<SortOption>(SortOption.Popular);

  const onSortChange = (option: SortOption) => {
    setActiveSort(option);
  };

  useEffect(() => {
    if (activeSort === SortOption.PriceLowToHigh) {
      setSortedOffers(offers.toSorted((a, b) => a.price - b.price));
    }

    if (activeSort === SortOption.PriceHighToLow) {
      setSortedOffers(offers.toSorted((a, b) => b.price - a.price));
    }

    if (activeSort === SortOption.TopRatedFirst) {
      setSortedOffers(offers.toSorted((a, b) => b.rating - a.rating));
    }
  }, [activeSort, offers]);

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
