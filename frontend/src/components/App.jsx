import React from 'react';
import getCrimesNearArea from '../api/getCrimesNearArea';
import logo from '../logo.jpg';
import '../../style/app.scss';

function App() {
  getCrimesNearArea(0.431697010993958, 51.6238441467285, 10)
    .then((data) => {
      console.log(data);
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
