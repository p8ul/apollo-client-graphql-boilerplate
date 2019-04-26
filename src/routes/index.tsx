import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Post';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrivateRoute from './Private';
import Sidebar from '../components/Sidebar';
import PostForm from '../components/Post/PostForm'
import { any } from 'prop-types';

const routes = [
    {
      path: '/',
      name: 'Home Page',
      component: Home,
      protected: true
    },
    {
        path: '/post',
        name: 'Post Form',
        component: PostForm,
        protected: true
      },
    {
      path: '/signin',
      name: 'Sigin Page',
      component: SignIn,
    },
    {
        path: '/signup',
        name: 'Sign Up page',
        component: SignUp
    }
]

const RoutedApp = () => {
    return (
        <Router>
            <Sidebar>
                <Switch>
                    {routes.map((route) => {
                    if (route.protected) {
                        return (
                        <PrivateRoute
                            exact
                            path={route.path}
                            component={route.component}
                            key={route.path}
                        />
                        );
                    }
                    return <Route exact path={route.path} component={route.component} key={route.path} />;
                    })}
                </Switch>
            </Sidebar>
        </Router>
    );
}

export default RoutedApp;
