import { useEffect } from 'react';
import { placesOption, SortOption } from '../utils/const';
import { useBoolean } from '../utils/boolean';
import classNames from 'classnames';

type SortProps = {
  active: SortOption;
  handleSort: (option: SortOption) => void;
};

function Sort({ active, handleSort }: SortProps): JSX.Element {
  const { isOn, off, toggle } = useBoolean(false);

  useEffect(() => {
    if (isOn) {
      const onEscKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          off();
        }
      };

      document.addEventListener('keydown', onEscKeyDown);

      return () => {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }
  }, [isOn, off]);

  const selectedOption = placesOption[active];

  return (
    <form className="places__sorting" action="#" method="get" onClick={toggle}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        role="list"
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOn,
        })}
      >
        {placesOption.map((option, index) => (
          <li
            className={classNames('places__option', {
              'places__option--active': selectedOption === option,
            })}
            key={option}
            onClick={() => handleSort(index)}
            tabIndex={0}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
