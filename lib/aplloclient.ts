// client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/api/dev/v2/connect/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('sb-access-token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({ // <--- Add 'export const' here
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});