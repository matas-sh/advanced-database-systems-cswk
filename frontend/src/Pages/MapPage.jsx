import React from 'react';
import QueryDrawer from '../Components/QueryDrawer';
import SearchBar from '../Components/SearchBar';
import Map from '../Components/Map';
import SearchState from '../State/SearchState';
import QueryState from '../State/QueryState';
import '../../style/custom.scss';


export default function RenderMap() {
  return (
    <>
      <SearchState>
        <QueryState>
          <div id="app-grid">
            <QueryDrawer />
            <Map />
          </div>
          <div id="app-search">
            <SearchBar />
          </div>
        </QueryState>
      </SearchState>
    </>
  );
}
