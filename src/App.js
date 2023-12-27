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
import Auth from './user/pages/Auth';
import Doctors from './doctor/components/DoctorList';
//import Shifts from './shift/pages/Shifts'

const App = () => { 
let routes;

    routes = (
        <Switch>
            <Route path="/users" exact>
                <Users />
            </Route>
            <Route path="/specialties" exact>
                <Specialties />
            </Route>
            <Route path="/">
                <Auth />
            </Route>
            <Route path="/doctors">
                <Doctors />
            </Route>
            {/* <Route path="/shifts">
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