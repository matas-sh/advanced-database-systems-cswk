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

function generateMarkerData(jsonMarkerDataList) {
  const markerDataList = {};
  jsonMarkerDataList.forEach((element) => {
    if (typeof (markerDataList[element.location.coordinates]) === 'undefined') {
      markerDataList[element.location.coordinates] = {
        location: element.location.coordinates,
        streetName: element.street_name,
        [element.crime_type]: 0,
      };
    } else if (markerDataList.location === element.location.coordinates) {
      if (element.crime_type in markerDataList[element.location.coordinates]) {
        markerDataList[element.location.coordinates][element.crime_type] += 1;
      } else {
        markerDataList[element.location.coordinates][element.crime_type] = 0;
      }
    }
    console.log('markerDataList: ', markerDataList);
    // if(typeof(markerDataList[element['street_name']]) === 'undefined') {
    //   markerDataList[element['street_name']] = {
    //     location: element['location']['coordinates'],
    //     [element['crime_type']] : 0
    //   };
    // } else if (markerDataList['street_name']['location'] === element['location']['coordinates']) {
    //   if(element['crime_type'] in markerDataList[element['street_name']]) {
    //     markerDataList[element['street_name']][element['crime_type']] +=1;
    //   } else {
    //     markerDataList[element['street_name']][element['crime_type']] = 0;
    //   }
    // } else {

    // }

  });
}


export default function AppMap() {
  const { qDispatch, qState } = useContext(QueryContext);
  const { position, distance, zoom } = qState;
  const mapRef = useRef(null);
  console.log('qState: ', qState);

  // market data example
  const markerData = [{
    position: [52.486304, -1.888485],
    popUpText: (
      <>
        <p> [drimeType]: 3</p>
        <p> street: [streetname</p>
      </>
    ),
  }];
  // generateMarkerData(qState.data);
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
      {MarkerGenerator(markerData)}
    </Map>
  );
}
