import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MapComponent from './map-component';
import { TCity } from '../store/slices/cities-slice.ts';
import { CitiesEnum } from '../utils/const.ts';

// Мокаем Leaflet и пользовательские хуки
vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn(() => ({
    setIcon: vi.fn(),
    addTo: vi.fn(),
  })),
  layerGroup: vi.fn(() => ({
    addTo: vi.fn(),
    clearLayers: vi.fn(),
  })),
}));

vi.mock('./use-map', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    setView: vi.fn(),
    removeLayer: vi.fn(),
  })),
}));

const mockStore = configureMockStore();
const mockCity: TCity = {
  name: CitiesEnum.Paris,
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
  offers: [],
};

describe('MapComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map container', () => {
    const store = mockStore({
      cities: {
        currentCity: mockCity,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MapComponent
            className="cities__map"
            city={mockCity}
            selectedPoint={null}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.cities__map')).toBeInTheDocument();
  });
});
