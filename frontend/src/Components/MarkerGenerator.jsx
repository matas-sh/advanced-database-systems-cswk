import React from 'react';
import {
  Marker,
  Popup,
} from 'react-leaflet';

export function marker(markerData) {
  let component = null;

  if (typeof (markerData.popUpText) !== 'undefined') {
    component = (
      <Marker position={markerData.position} opacity={0.8}>
        <Popup>
          {markerData.popUpText}
        </Popup>
      </Marker>
    );
  } else {
    component = (
      <Marker position={markerData.position} />
    );
  }
  return component;
}

export default function MarkerGenerator(markerData) {
  const markers = markerData.map((markerDatum) => marker(markerDatum));

  return markers;
}
