import AuthenticatedLayout from '@/layout/AuthenticatedLayout.tsx';
import Dashboard from '@/pages/Dashboard';
import Explore from '@/pages/Explore';
import Profile from '@/pages/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UnauthenticatedLayout from './layout/UnauthenticatedLayout';
import Collection from './pages/Collection';
import Login from './pages/Login';
import UserCollections from './pages/Profile/UserCollections';
import UserPosts from './pages/Profile/UserProfile/UserPosts';
import Register from './pages/Register';
import Conversation from './pages/Conversation';

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
    path: '/direct',
    element: (
      <AuthenticatedLayout>
        <Conversation />
      </AuthenticatedLayout>
    ),
    children: [
      {
        path: '',
        element: <UserPosts />,
      },
      {
        path: 'inbox',
        element: <UserPosts />,
      },
      {
        path: 'saved',
        element: <UserCollections />,
      },
    ],
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
