import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CardType, TCity } from '../utils/type';
import useMap from './use-map';
import { URL_MARCER_ACTIVE, URL_MARKER_DEFAULT } from './const';

type MapProps = {
  city: TCity;
  offers: CardType[];
  selectedPoint: CardType | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARCER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapMain(props: MapProps): JSX.Element {
  const { city, offers, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && offer.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return <section className="cities__map map" ref={mapRef} />;
}

export default MapMain;
