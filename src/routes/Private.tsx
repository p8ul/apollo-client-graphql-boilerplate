import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Store from '../utils/storage';
import { TOKEN } from '../constants/keys'

export const PrivateRoute = (data: any) => {
    const store = new Store(TOKEN);
    const isLoggedIn = !!store.retrieve().token;
    const { component, ...rest } = data;
    const Component = component;
    return (
        /*
         * This component checks if a user is allowed to access a certain route
         * Props: path: string: url path
         *        component: React Component
         *  Usage: <PrivateRoute
                      path={prop.path}
                      component={prop.component}
                    />
         * */
        <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
      );
}

export default PrivateRoute;