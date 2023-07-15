'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: { lat: number; lng: number } | null;
  zoom?: number;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center, zoom  }) => {
  const defaultCenter: { lat: number; lng: number } = { lat: 12.8797, lng: 121.7740 };
  const defaultZoom = 10;

  const mapCenter = center || defaultCenter;
  const mapZoom = zoom || defaultZoom;

  return (
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        scrollWheelZoom={false} 
        className="h-[35vh] rounded-lg"
      >
        <TileLayer
          url={url}
          attribution={attribution}
        />
        {center && (
          <Marker position={center as L.LatLngExpression} />
        )}
      </MapContainer>
  )
}

export default Map