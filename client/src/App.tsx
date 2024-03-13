import { Provider } from 'react-redux';
import { AppRoutes } from './route';
import { persistor, store } from './store';
import client from '@/apollo-client.ts';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';

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
