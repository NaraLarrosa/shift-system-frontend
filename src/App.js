import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

//import Users from './product/pages/Users';
import AddSpecialty from './specialty/pages/AddSpecialty';
import Specialties from './specialty/pages/Specialties';

const App = () => { 
let routes;

    routes = (
        <Switch>
            <Route path="/" exact>
                <Specialties />
            </Route>
            <Route path="/add">
                <AddSpecialty />
            </Route>

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