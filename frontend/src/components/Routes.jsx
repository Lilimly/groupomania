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
import Commentpage from './Comments/Commentpage';
import UpdateComment from './Comments/UpdateComment';
import DeleteComment from './Comments/DeleteComment';

const Routes = () => {
    
    const Auth = React.useContext(AuthApi)

    return (
        <Switch>
            <ProtectedLogin path="/" exact component={Home} />
            <ProtectedLogin path="/signup" component={Signup} />
            <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
            <Route path="/user/:id" auth={Auth.auth} component={User} />
            <Route path="/userupdate/:id" auth={Auth.auth} component={UpdateAccount} />
            <Route path="/userdelete/:id" auth={Auth.auth} component={DeleteAccount} />
            <Route path="/articles" auth={Auth.auth} component={Articles} />
            <Route path="/createarticle" auth={Auth.auth} component={CreateArticle} />
            <Route path="/article/:id" auth={Auth.auth} component={ArticlePage} />
            <Route path="/articleupdate/:id" auth={Auth.auth} component={UpdateArticle} />
            <Route path="/articledelete/:id" auth={Auth.auth} component={DeleteArticle} />
            <Route path="/commentpage/:id" auth={Auth.auth} component={Commentpage} />
            <Route path="/updatecomment/:id" auth={Auth.auth} component={UpdateComment} />
            <Route path="/deletecomment/:id" auth={Auth.auth} component={DeleteComment} />
        </Switch>
    )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {() => !auth? (
            <>
                <Component />
            </>
        ) :
            (
                <Redirect to="/articles" />
            )
            }
        />
    )
}

export default Routes;

/* const ProtectedRoute = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {() => auth? (
            <>
                <Component />
            </>
        ) :
            (
                <Redirect to="/login" />
            )
            }
        />
    )
}*/