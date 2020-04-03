import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './core/Admin/Login/Login';
import NotFound from './core/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
