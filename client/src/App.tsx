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
    m: 'm',
    mm: '%d m',
    h: 'h',
    hh: '%d h',
    d: 'd',
    dd: '%d d',
    w: 'w',
    ww: '%d w',
    M: 'm',
    MM: '%d m',
    y: 'y',
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
