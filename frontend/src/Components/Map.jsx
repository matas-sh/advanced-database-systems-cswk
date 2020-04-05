import React, { useContext, useRef } from 'react';
import {
  Map,
  TileLayer,
  Circle,
} from 'react-leaflet';
import MarkerGenerator from './MarkerGenerator';
import { QueryContext } from '../State/QueryState';
import '../../style/map.scss';

function changeLocation(mapRef, qDispatch) {
  if (typeof (mapRef.current) !== 'undefined') {
    qDispatch({
      type: 'SET_QUERY_VALUES',
      payload: {
        position: mapRef.current.viewport.center,
        zoom: mapRef.current.viewport.zoom,
      },
    });
  }
}


export default function AppMap() {
  const { qDispatch, qState } = useContext(QueryContext);
  const { position, distance, zoom } = qState;
  const mapRef = useRef(null);

  console.log('zoom: ', zoom);
  return (
    <Map
      center={position}
      zoom={zoom}
      animate
      ref={mapRef}
      onMoveEnd={() => changeLocation(mapRef, qDispatch)}
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
      <MarkerGenerator />
    </Map>
  );
}
