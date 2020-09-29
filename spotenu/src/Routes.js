import react from "React";
import {Switch, Route, BrowseRouter} from 'react-router-dom';
import Signup from './Pages/Signup'
import AdminSignup from './Pages/AdminSignup'
import Login from './Pages/Login'
import BandSignup from './Pages/BandSignup'
import Bands from './Pages/Bands'
import AdminDashboard from './Pages/AdminDashboard'
export default function Routes(){
    return(
        <div>
        <BrowseRouter>
            <Switch>
                <Route exact path='/signUp'>
                    <Signup/>
                </Route>
                <Route exact path='/adminSignUp'>
                    <AdminSignup/>
                </Route>
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/bandSignUp'>
                    <BandSignup/>
                </Route>
                <Route exact path='/getAllBands'>
                    <Bands/>
                </Route>
                <Route exact path='/gettingBandApproved'>
                    <AdminDashboard/>
                </Route>
            </Switch>
        </BrowseRouter>
        </div>
    )
}
