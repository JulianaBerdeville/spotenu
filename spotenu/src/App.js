import React from 'react';
import axios from 'axios'
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Signup from './Pages/Signup'
import AdminSignup from './Pages/AdminSignup'
import Login from './Pages/Login'
import BandSignup from './Pages/BandSignup'
import Bands from './Pages/Bands'
import AdminDashboard from './Pages/AdminDashboard'
import PreviewPage from './Pages/PreviewPage'

function App() {
  // axios.get('https://minha-api.com/endpoint', {
  //   headers: {
  //   authorization: 'nome-sobrenome-turma'}
  //   }) !! Essa é a sintaxe do Axios !!
  return (
    <div>
      <BrowserRouter>
            <Switch>
              <Route exact path='/'>
                    <PreviewPage/>
                </Route>
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
        </BrowserRouter>
    </div>
  );
}

export default App;
