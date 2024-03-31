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
import { RootState, store } from '@/store';
import axios from './axios';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

async function refreshAccessToken(state: RootState) {
  try {
    const response = await axios.post('/auth/refresh_token', {
      refreshToken: state.user.refreshToken,
    });

    const { accessToken } = response.data;

    store.dispatch(updateTokens({ accessToken }));

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
      const state = store.getState();
      refreshAccessToken(state)
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
  const state = store.getState();
  const accessToken =
    localStorage.getItem('accessToken') || state.user.accessToken;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
