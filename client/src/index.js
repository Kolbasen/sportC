import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css';
import Login from './Login';
import Main from './Main'
import Registration from './Registration'
import NextRegStep from './NextRegStep'
import ProfilePage from './ProfilePage';

ReactDOM.render((
    <Router>
        <Route exact path='/' component = {Main}/>
        <Route path = '/auth' component = {Login}/> 
        {/*<Route path='*' component={Login} />*/}
        <Route path = '/registration' component = {Registration}/>
        <Route path ='/nextstepreg' component ={NextRegStep}/>
        <Route path='/profile' component={ProfilePage}/>
    </Router>
    ), document.getElementById('root'));

