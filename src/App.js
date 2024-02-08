import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Specialties from './specialty/pages/Specialties';
import AddSpecialty from './specialty/pages/AddSpecialty';
import Doctors from './doctor/pages/Doctors';
import NewDoctor from './doctor/pages/NewDoctor';
import UpdateDoctor from './doctor/pages/UpdateDoctor';
import doctorItem from './doctor/components/DoctorItem';
import ShiftList from './shift/components/ShiftList';
import Auth from './user/pages/Auth';


const App = () => { 
let routes;

    routes = (
        <Switch>

            <Route path="/specialties" exact>
                <Specialties />
            </Route>
            <Route path="/specialty/add" exact>
                <AddSpecialty />
            </Route>

            <Route path="/doctors" exact>
                <Doctors />
            </Route>
            <Route path="/doctors/add" exact>
                <NewDoctor />
            </Route>
            <Route path="/doctors/update" exact>
                <UpdateDoctor />
            </Route>
            <Route path="/doctor/:did" exact>
                <Doctors />
            </Route>
            
            <Route path="/shifts">
                <ShiftList />
            </Route>

            <Route path="/users">
                <Auth />
            </Route>
            <Route path="/">
                <Auth />
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