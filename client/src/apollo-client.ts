import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { updateTokens } from '@/features/users/userSlice.ts';
import { store } from '@/store';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('http://localhost:3000/auth/refresh_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    const { accessToken, refreshToken: newRefreshToken } =
      await response.json();

    store.dispatch(
      updateTokens({ accessToken, refreshToken: newRefreshToken })
    );

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
      refreshAccessToken()
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
  const token = localStorage.getItem('accessToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
