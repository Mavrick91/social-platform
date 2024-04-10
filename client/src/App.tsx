import client from '@/apollo-client.ts';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { AppRoutes } from './route';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';

if (process.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1 m',
    ss: '1 m',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    w: '1 w',
    ww: '%d w',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </ApolloProvider>
  );
}

export default App;
