import React, { useContext, useRef } from 'react';
import {
  Map,
  TileLayer,
  Circle,
} from 'react-leaflet';
import MarkerGenerator from './MarkerGenerator';
import { SearchContext } from '../State/SearchState';
import { QueryContext } from '../State/QueryState';
import '../../style/map.scss';

function changeLocation(mapRef, dispatch) {
  if (typeof (mapRef.current) !== 'undefined') {
    dispatch({
      type: 'SET_LOCATION_FOUND',
      payload: {
        location: mapRef.current.viewport.center,
        zoom: mapRef.current.viewport.zoom,
      },
    });
  }
}

export default function AppMap() {
  const { sDispatch, sState } = useContext(SearchContext);
  const { qState } = useContext(QueryContext);
  const { position, distance } = qState;
  const { zoom } = sState;
  const mapRef = useRef(null);
  console.log('qState: ', qState);

  // market data example
  const markerData = [{
    position: [52.486304, -1.888485],
    popUpText: (
      <>
        <p> knifecrime: 3</p>
        <p> street: near or on Upon Avon</p>
      </>
    ),
  }];

  console.log('position: ', position);
  return (
    <Map
      center={position}
      zoom={zoom}
      animate
      ref={mapRef}
      onMoveEnd={() => changeLocation(mapRef, sDispatch)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        minZoom={8}
        maxZoom={18}
      />
      <Circle
        center={position}
        radius={distance}
        fillOpacity={0}
        color="#52af77"
        weight={2}
        dashArray={5}
        stroke={{
          opacity: 0.5,
          width: 2,
        }}
        // fillColor="#00FFFFFF"
      />
      {MarkerGenerator(markerData)}
    </Map>
  );
}
