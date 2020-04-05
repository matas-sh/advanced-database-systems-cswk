import React, { useContext } from 'react';
import {
  Marker,
  Popup,
} from 'react-leaflet';
import { QueryContext } from '../State/QueryState';


function generateMarkerData(jsonMarkerDataList) {
  const markerDataList = {};
  const markerDataListArray = [];
  console.log('SOSOSOSOSOSOSOSOSOSOSOS');

  jsonMarkerDataList.forEach((element) => {
    if (typeof (markerDataList[element.location.coordinates]) === 'undefined') {
      markerDataList[element.location.coordinates] = {
        location: element.location.coordinates,
        streetName: element.street_name,
        [element.crime_type]: 1,
      };
    } else if (markerDataList.location === element.location.coordinates) {
      if (element.crime_type in markerDataList[element.location.coordinates]) {
        markerDataList[element.location.coordinates][element.crime_type] += 1;
      } else {
        markerDataList[element.location.coordinates][element.crime_type] = 1;
      }
    }
  });
  let i = 0;
  Object.keys(markerDataList).forEach((key) => {
    const popUpString = [];
    let a = 0;
    Object.keys(markerDataList[key]).forEach((crimeKey) => {
      if (crimeKey !== 'location') {
        popUpString[a] = (`${crimeKey}: ${markerDataList[key][crimeKey]}`);
        a += 1;
      }
    });
    markerDataListArray[i] = {
      position: markerDataList[key].location,
      popUpText: popUpString.join('\n'),
    };
    i += 1;
  });

  return markerDataListArray;
}


export function marker(markerData) {
  let component = null;

  if (typeof (markerData.popUpText) !== 'undefined') {
    component = (
      <Marker
        position={[markerData.position[1], markerData.position[0]]}
        key={markerData.position}
        opacity={0.8}
      >
        <Popup>
          {markerData.popUpText}
        </Popup>
      </Marker>
    );
  } else {
    component = (
      <Marker
        position={[markerData.position[1], markerData.position[0]]}
        key={markerData.position}
      />
    );
  }
  return component;
}

export default function MarkerGenerator() {
  const { qDispatch, qState } = useContext(QueryContext);
  console.log('data: ', qDispatch, qState);
  const { data } = qState;
  console.log('data: ', qDispatch, qState);
  const markerData = generateMarkerData(data);

  return (
    <>
      {markerData.map((markerDatum) => marker(markerDatum))}
    </>
  );
}
