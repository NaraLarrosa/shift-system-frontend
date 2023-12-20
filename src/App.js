import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import Users from './product/pages/Users';

const App = () => { 
let routes;

    routes = (
        <Switch>
            <Route path="/register" exact>
                <RegisterUser />
            </Route>
            <Route path="/login">
                <LoginUser />
            </Route>
            <Route path="/recoverPassword">
                <RecoverPassword />
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