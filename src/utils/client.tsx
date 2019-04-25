import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Store from './storage';
import { TOKEN } from '../constants/keys'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

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