import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import State from '../State';
import '../../style/custom.scss';

export default function RenderMap() {
  return (
    <>
      <div id="app-grid">
        <State>
          <QueryDrawer />
          <Map />
        </State>
      </div>
      <div id="app-search">
        <SearchBar />
      </div>
    </>
  );
}
