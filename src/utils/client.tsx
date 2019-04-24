import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split, NextLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import {signOut} from '../components/SignOut/index'
import { setContext } from 'apollo-link-context';
import Store from './storage';
import { TOKEN } from '../constants/keys'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});



const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  httpLink,
);

const store = new Store(TOKEN); 
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
     
  const token = store.retrieve();
      
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token.token : "",
    }
  }
});

const errorLink = onError((data) => {
  const { networkError, graphQLErrors} = data;
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'UNAUTHENTICATED') {
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    // if (networkError.statusCode === 401) {
    //   signOut(client);
    // }
  }
});

const link = ApolloLink.from([errorLink, terminatingLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

cache.writeData({
  data: {
    isLoggedIn: !!store.retrieve().token,
  },
});

export default client;