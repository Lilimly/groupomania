//imports react
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

//imports composants
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Articles from './components/Articles';
import User from './components/User';
import UpdateAccount from './components/UpdateAccount';

//import CSS
import './css/App.css';

// definition composant App
function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/articles" component={Articles} />
        <Route path="/user/:id" component={User} />
        <Route path="/useredit/:id/" component={UpdateAccount} />
      </Router>
    </>
  );
}

export default App;
