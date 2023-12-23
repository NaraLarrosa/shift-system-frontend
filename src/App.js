import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import Users from './user/pages/Users';
import Specialties from './specialty/pages/Specialties';
// import Doctors from './doctor/pages/Doctors'
// import Shifts from './doctor/pages/Shifts'

const App = () => { 
let routes;

    routes = (
        <Switch>
            <Route path="/" exact>
                <Users />
            </Route>
            <Route path="/">
                <Specialties />
            </Route>
            {/* <Route path="/">
                <Doctors />
            </Route>
            <Route path="/">
                <Shifts />
            </Route> */}
            <Redirect to="/" />
        </Switch>
    );

    return (
        <Router>
            <MainNavigation />
            <main>{routes}</main>
        </Router>
    );
}

export default App;