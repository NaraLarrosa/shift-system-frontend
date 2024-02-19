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
import Auth from './user/pages/Auth';
import ViewShift from './shift/components/ViewShift';
import ListPatient from './shift/pages/ListPatient';
import ShiftByPatient from './shift/pages/ShiftsByPatient';
import CanceledShiftByPatient from './shift/pages/CanceledShiftsByPatient';
import RecoverPassword from './user/pages/RecoverPassword';
import UserItem from './user/components/UserItem';
import Welcome from './user/pages/Welcome';

const App = () => { 
let routes;

    routes = (
        <Switch>

            <Route path="/" exact>
                <Welcome />
            </Route>

            <Route path="/specialties" exact>
                <Specialties />
            </Route>
            <Route path="/specialty/add" exact>
                <AddSpecialty />
            </Route>

            <Route path="/shift/patient" exact>
                <ListPatient />
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
            <Route path="/doctors/update/:did" exact>
                <UpdateDoctor/>
            </Route>
            <Route path="/user-item" exact>
                <UserItem />
            </Route>
            
            <Route path="/shift">
                <ViewShift />
            </Route>
            <Route path="/shift/doctor/:userId">
                <Doctors />
            </Route>
            <Route path="/history/cancel/:userId">
                <CanceledShiftByPatient />
            </Route> 
            <Route path="/pat/:userId">
                <ShiftByPatient />
            </Route>
            
            <Route path="/users">
                <RecoverPassword />
            </Route>
            <Route path="/login">
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