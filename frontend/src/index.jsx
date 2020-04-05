import React from 'react';
import ReactDOM from 'react-dom';
import '../style/index.scss';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MapPage from './Pages/MapPage';


export default function AppRouter() {
  return (
    <Router>
      <div id="router">
        <Switch>
          <Route path="/">
            <MapPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


ReactDOM.render(<AppRouter />, document.getElementById('root'));
