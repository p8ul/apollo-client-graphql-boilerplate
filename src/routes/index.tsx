import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Post';
import SignIn from '../components/SignIn';
import PrivateRoute from './Private';
import Sidebar from '../components/Sidebar';

const routes = [
    {
      path: '/',
      name: 'Home Page',
      component: Home,
      protected: true
    },
    {
      path: '/signin',
      name: 'Sigin Page',
      component: SignIn,
    },
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