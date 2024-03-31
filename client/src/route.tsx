import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UnauthenticatedLayout from './layout/UnauthenticatedLayout';
import Dashboard from '@/pages/Dashboard';
import AuthenticatedLayout from '@/layout/AuthenticatedLayout.tsx';
import Profile from '@/pages/Profile';
import Explore from '@/pages/Explore';
import Collection from './pages/Collection';
import UserPosts from './pages/Profile/UserProfile/UserPosts';
import UserCollections from './pages/Profile/UserCollections';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <UnauthenticatedLayout>
        <Login />
      </UnauthenticatedLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <UnauthenticatedLayout>
        <Register />
      </UnauthenticatedLayout>
    ),
  },
  {
    path: '/',
    element: (
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    ),
  },
  {
    path: '/explore',
    element: (
      <AuthenticatedLayout>
        <Explore />
      </AuthenticatedLayout>
    ),
  },
  {
    path: '/:username',
    element: (
      <AuthenticatedLayout>
        <Profile />
      </AuthenticatedLayout>
    ),
    children: [
      {
        path: '',
        element: <UserPosts />,
      },
      {
        path: 'posts',
        element: <UserPosts />,
      },
      {
        path: 'saved',
        element: <UserCollections />,
      },
    ],
  },
  {
    path: '/:username/saved/:collectionName',
    element: (
      <AuthenticatedLayout>
        <Collection />
      </AuthenticatedLayout>
    ),
  },
]);
export const AppRoutes = () => <RouterProvider router={router} />;
