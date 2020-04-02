import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import Map from '../components/Map';


export default function RenderMap() {
  return (
    <div id="app-grid">
      <QueryDrawer />
      <Map />
    </div>
  );
}
