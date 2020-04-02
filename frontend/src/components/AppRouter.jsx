import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import App from './App';
import Map from './Map';

export default function AppRouter() {
  return (
    <Router>
      <div id="router">
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
