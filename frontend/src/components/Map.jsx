import React, { useContext, useRef } from 'react';
import {
  Map,
  TileLayer,
  // Marker,
  // Popup,
} from 'react-leaflet';
import MarkerGenerator from './MarkerGenerator';
import { SearchContext } from '../State/SearchState';
import '../../style/map.scss';

function changeLocation(mapRef, dispatch) {
  if (typeof (mapRef.current) !== 'undefined') {
    dispatch({
      type: 'SET_LOCATION_FOUND',
      payload: mapRef.current.viewport.center,
    });
  }
}

export default function AppMap() {
  const { sDispatch, sState } = useContext(SearchContext);
  const { location } = sState;
  const mapRef = useRef(null);


  const markerData = [{
    position: [52.486304, -1.888485],
    popUpText: (<h1> Knifecrime </h1>),
  }];

  return (
    <Map
      center={location}
      zoom={14}
      animate
      ref={mapRef}
      onMoveEnd={() => changeLocation(mapRef, sDispatch)}
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
