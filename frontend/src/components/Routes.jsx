//imports React
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//imports composants
import AuthApi from './AuthApi';
import Home from './Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import User from './Users/User';
import UpdateAccount from './Users/UpdateAccount';
import DeleteAccount from './Users/DeleteAccount';
import Articles from './Articles/Articles';
import ArticlePage from './Articles/ArticlePage';
import CreateArticle from './Articles/CreateArticle';
import UpdateArticle from './Articles/UpdateArticle';
import DeleteArticle from './Articles/DeleteArticle';


import Test from './test';
const Routes = () => {
    
    const Auth = React.useContext(AuthApi)

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
            <ProtectedRoute path="/user/:id" auth={Auth.auth} component={User} />
            <ProtectedRoute path="/userupdate/:id" auth={Auth.auth} component={UpdateAccount} />
            <ProtectedRoute path="/userdelete/:id" auth={Auth.auth} component={DeleteAccount} />
            <ProtectedRoute path="/articles" auth={Auth.auth} component={Articles} />
            <ProtectedRoute path="/createarticle" auth={Auth.auth} component={CreateArticle} />
            <Route path="/article/:id" component={ArticlePage} />
            <ProtectedRoute path="/articleupdate/:id" auth={Auth.auth} component={UpdateArticle} />
            <ProtectedRoute path="/articledelete/:id" auth={Auth.auth} component={DeleteArticle} />
        </Switch>
    )
}

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {() => auth? (
            <Component />
        ) :
            (
                <Redirect to="/login" />
            )
            }
        />
    )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {() => !auth? (
            <Component />
        ) :
            (
                <Redirect to="/articles" />
            )
            }
        />
    )
}

export default Routes;