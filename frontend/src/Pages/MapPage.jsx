import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import MapState from '../MapState';
import SearchState from '../SearchState';
import '../../style/custom.scss';


export default function RenderMap() {
  return (
    <>
      <SearchState>
        <div id="app-grid">
          <MapState>
            <QueryDrawer />
            <Map />
          </MapState>
        </div>
        <div id="app-search">
          <SearchBar />
        </div>
      </SearchState>
    </>
  );
}
