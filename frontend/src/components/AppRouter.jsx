
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <Router>
    <div>
      {/*
      <ul>
        <li>
          <Link to="/">App</Link>
        </li>
      </ul>

      <hr />
      {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/about" />
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
