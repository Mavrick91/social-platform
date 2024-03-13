import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UnauthenticatedLayout from './layout/UnauthenticatedLayout';
import Dashboard from '@/pages/Dashboard';
import AuthenticatedLayout from '@/layout/AuthenticatedLayout.tsx';
import Profile from '@/pages/Profile';

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
    path: '/dashboard',
    element: (
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthenticatedLayout>
        <Profile />
      </AuthenticatedLayout>
    ),
  },
]);
export const AppRoutes = () => <RouterProvider router={router} />;
