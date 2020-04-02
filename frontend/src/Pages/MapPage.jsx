import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import Map from '../components/Map';
import State from '../State';

export default function RenderMap() {
  return (
    <div id="app-grid">
      <State>
        <QueryDrawer />
        <Map />
      </State>
    </div>
  );
}
