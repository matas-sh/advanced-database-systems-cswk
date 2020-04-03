import React, { useContext } from 'react';
import {
  Map,
  TileLayer,
  // Marker,
  // Popup,
} from 'react-leaflet';
import MarkerGenerator from './MarkerGenerator';
import { MapContext } from '../MapState';
import { SearchContext } from '../SearchState';
import '../../style/map.scss';

export default function AppMap() {
  const { mState } = useContext(MapContext);
  const { sState } = useContext(SearchContext);
  const markerData = [{
    position: [52.486304, -1.888485],
    popUpText: (<h1> Knifecrime </h1>),
  }];
  const location = sState.searchLocation !== null ? sState.searchLocation : mState.location;
  console.log('location: ', location);
  return (
    <Map
      center={location}
      zoom={12}
      animate
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        minZoom={12}
        maxZoom={18}
      />
      {MarkerGenerator(markerData)}
    </Map>
  );
}
