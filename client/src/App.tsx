import client from '@/apollo-client.ts';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRoutes } from './route';
import { persistor, store } from './store';

if (process.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
