import React from 'react';
import getAllCrimesNearArea from '../api/getAllCrimesNearLocation';
import getLocationByString from '../api/getLocationByString';
import logo from '../logo.jpg';
import '../../style/app.scss';

function App() {
  getAllCrimesNearArea(0.431697010993958, 51.6238441467285, 10)
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });

  getLocationByString('B4 7ET')
    .then((data) => {
      console.log(data.origin.displayLatLng);
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <br />
        <em>
          Powered by house of clowns
        </em>
      </header>
    </div>
  );
}

export default App;
