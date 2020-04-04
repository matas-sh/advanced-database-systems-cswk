import React from 'react';
import QueryDrawer from '../components/QueryDrawer';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import SearchState from '../State/SearchState';
import '../../style/custom.scss';


export default function RenderMap() {
  return (
    <>
      <SearchState>
        <div id="app-grid">
          <QueryDrawer />
          <Map />
        </div>
        <div id="app-search">
          <SearchBar />
        </div>
      </SearchState>
    </>
  );
}
