import React, { useContext } from 'react';
import {
  Map,
  TileLayer,
  // Marker,
  // Popup,
} from 'react-leaflet';
import { MapContext } from '../State';
import '../../style/map.scss';

export default function AppMap() {
  const { mState } = useContext(MapContext);

  return (
    <Map center={mState.location} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        minZoom={12}
        maxZoom={18}
      />
    </Map>
  );
}
