import { createBrowserRouter } from 'react-router';
import App from './App';
import AuthUser from './components/AuthUser';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import Home from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Authentication isSignup={false} />,
      },
      {
        path: '/signup',
        element: <Authentication isSignup={true} />,
      },
      {
        path: '/details/:id',
        element: <Detail />,
      },
      {
        path: '/dashboard',
        element: <AuthUser />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

/**
 *  path / homepage
 *  path /login login
 *  path /signup signup
 *  path /dashboard dashboard (protected)
 */
