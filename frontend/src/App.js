//imports react
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

//imports composants
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User';
import UpdateAccount from './components/UpdateAccount';
import DeleteAccount from './components/DeleteAccount';
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
import DeleteArticle from './components/DeleteArticle';

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
        <Route path="/user/:id" component={User} />
        <Route path="/userupdate/:id" component={UpdateAccount} />
        <Route path="/userdelete/:id" component={DeleteAccount} />
        <Route path="/articles" component={Articles} />
        <Route path="/createarticle" component={CreateArticle} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/articleupdate/:id" component={UpdateArticle} />
        <Route path="/articledelete/:id" component={DeleteArticle} />
      </Router>
    </>
  );
}

export default App;
