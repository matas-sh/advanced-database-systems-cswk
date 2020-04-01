import React from 'react';
import logo from './logo.jpg';
import '../style/app.scss';
import getCrimesNearArea from '../api/getCrimesNearArea';

function App() {

  getCrimesNearArea(asda, asdasd, 100).then(
    (data) => console.log(data)
  );

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
