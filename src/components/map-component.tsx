import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OffersType } from '../utils/type';
import useMap from './use-map';
import {
  URL_MARKER_ACTIVE as URL_MARKER_ACTIVE,
  URL_MARKER_DEFAULT,
} from './const';
import { TCity } from '../reducer/cities/citiesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapComponentProps = {
  className: string;
  city: TCity;
  selectedPoint: OffersType | null;
};

function MapComponent({
  className,
  city,
  selectedPoint,
}: MapComponentProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const offers = useSelector(
    (state: RootState) => state.cities.currentCity.offers
  );

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && offer.id === selectedPoint?.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [
    map,
    offers,
    selectedPoint,
    city.location.latitude,
    city.location.longitude,
    city.location.zoom,
  ]);

  return <section className={`${className} map`} ref={mapRef} />;
}

export default MapComponent;
