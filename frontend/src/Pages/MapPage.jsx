import React from 'react';
import QueryDrawer from '../Components/QueryDrawer';
import SearchBar from '../Components/SearchBar';
import Map from '../Components/Map';
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
