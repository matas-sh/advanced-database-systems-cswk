import React, { useContext } from 'react';
import {
  Map,
  TileLayer,
  // Marker,
  // Popup,
} from 'react-leaflet';
import MarkerGenerator from './MarkerGenerator';
import { SearchContext } from '../SearchState';
import '../../style/map.scss';

export default function AppMap() {
  const { sState } = useContext(SearchContext);
  const { location } = sState;

  const markerData = [{
    position: [52.486304, -1.888485],
    popUpText: (<h1> Knifecrime </h1>),
  }];


  console.log('location: ', location);
  return (
    <Map
      center={location}
      zoom={14}
      animate
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        minZoom={14}
        maxZoom={18}
      />
      {MarkerGenerator(markerData)}
    </Map>
  );
}
