import React from 'react';
import { ApolloConsumer } from 'react-apollo';

// import * as routes from '../../constants/routes';
// import history from '../../constants/history';

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
);

interface client {
  resetStore: () => {};
}
const signOut = (client: client)=> {
  localStorage.removeItem('token');
  client.resetStore();
//   history.push(routes.SIGN_IN);
};

export { signOut };

export default SignOutButton;