import React, { useContext } from 'react';
import {
  Marker,
  Popup,
} from 'react-leaflet';
import { QueryContext } from '../State/QueryState';


function generateMarkerData(jsonMarkerDataList) {
  const markerDataListArray = jsonMarkerDataList.map((elem) => {
    const PopUpString = elem['crime-types'].map((crimeType) => (
      <>
        <span>
          {' '}
          {crimeType}
          {' '}

        </span>
        {' '}
        <br />
      </>
    ));
    return {
      /* eslint-disable no-underscore-dangle */
      position: elem._id.location.coordinates,
      /* eslint-disable no-underscore-dangle */
      popUpText: (
        <>
          <span>
            {' '}
            {elem._id['street-name']}
            {' '}
          </span>
          {' '}
          <br />
          {PopUpString}
        </>),
    };
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
        autoPan
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
  const { qState } = useContext(QueryContext);
  const markerData = generateMarkerData(qState.data);

  return (
    <>
      {markerData.map((markerDatum) => marker(markerDatum))}
    </>
  );
}
