import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LocationListMain from './location-list-main';
import { CITIES } from '../utils/const';

const mockStore = configureMockStore();

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: () => vi.fn(),
  };
});

describe('Component: LocationListMain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render cities list and handle clicks', () => {
    const store = mockStore({
      cities: { currentCity: CITIES[0] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LocationListMain />
        </MemoryRouter>
      </Provider>
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });

    const firstCityLink = screen.getAllByRole('link')[0];
    expect(firstCityLink).toHaveClass('tabs__item--active');
  });
});
