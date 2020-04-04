import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import Login from './core/Admin/Login/Login';
import NotFound from './core/NotFound/NotFound';
import Dashboard from './core/Admin/Dashboard/Dashboard';
import AdminList from './core/Admin/AdminList/AdminList';
import AdminAdd from './core/Admin/AdminList/AdminAdd';
import "bootstrap/js/dist/modal";
import UniversityList from './core/Admin/University/UniversityList';
import UniversityDetail from './core/Admin/University/UniversityDetail';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/adminlist" component={AdminList} />
          <Route exact path="/admin/adminlist/add" component={AdminAdd} />
          <Route exact path="/admin/university" component={UniversityList} />
          <Route exact path="/admin/university/detail/:id" component={UniversityDetail} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
