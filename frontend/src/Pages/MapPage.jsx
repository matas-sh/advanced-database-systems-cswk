import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import Map from '../components/Map';


export default function RenderMap() {
  // const state = {
  //   lat: 51.505,
  //   lng: -0.09,
  //   zoom: 13,
  // };

  return (
    <div id="app-grid">
      <QueryDrawer />
      <Map />
    </div>
  );
}
