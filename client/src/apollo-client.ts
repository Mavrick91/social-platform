import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  Observable,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import axios from './axios';
import { getTokens, updateAccessToken } from './lib/storage';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
    connectionParams: () => {
      const tokens = getTokens();
      return {
        authorization: tokens ? `Bearer ${tokens.accessToken}` : '',
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post('/auth/refresh_token', {
      refreshToken: refreshToken,
    });

    const { accessToken } = response.data;

    updateAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token.');
  }
}

const refreshLink = onError(({ forward, operation, graphQLErrors }) => {
  if (
    graphQLErrors &&
    graphQLErrors.some((err) => err.message === 'UNAUTHENTICATED')
  ) {
    return new Observable((observer) => {
      const tokens = getTokens();

      if (!tokens) {
        observer.error('No refresh token found');
        return;
      }

      refreshAccessToken(tokens.refreshToken)
        .then((accessToken) => {
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${accessToken}`,
            },
          }));
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };
          forward(operation).subscribe(subscriber);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const tokens = getTokens();

  return {
    headers: {
      ...headers,
      authorization: tokens ? `Bearer ${tokens.accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([refreshLink, authLink, splitLink]),
  cache: new InMemoryCache(),
});

export default client;
