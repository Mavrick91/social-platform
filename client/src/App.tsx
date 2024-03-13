import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './route';
import { store } from './store';
import client from '@/apollo-client.ts';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
