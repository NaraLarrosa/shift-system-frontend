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
import DoctorItem from './doctor/components/DoctorItem';
import NewShift from './shift/pages/NewShift';
import Auth from './user/pages/Auth';
import ShiftReserve from './shift/pages/ShiftReserve';
import ViewShift from './shift/components/ViewShift';
import ShiftByDoctor from './shift/pages/ShiftsByDoctor';

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
            <Route path="/doctor/:did" exact>
                <DoctorItem/>
            </Route>
            <Route path="/doctors/update" exact>
                <UpdateDoctor/>
            </Route>
            
            <Route path="/shift">
                <ViewShift />
            </Route>
            <Route path="/shift/doctor">
                <ShiftByDoctor />
            </Route>
            <Route path="/new-shift">
                <NewShift />
            </Route>
            <Route path="/reservation">
                <ShiftReserve />
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