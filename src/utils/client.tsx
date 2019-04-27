import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { getMainDefinition } from 'apollo-utilities';

import toastr from 'toastr';
import { token } from './auth';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token.token : "",
    }
  }
});


const cache = new InMemoryCache();

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message }) =>
        toastr.error(message)
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }), authLink, link]),
});

cache.writeData({
  data: {
    isLoggedIn: token.token,
  },
});

export default client;