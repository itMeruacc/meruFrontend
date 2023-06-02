import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Settings from './pages/Settings';
import Clients from './pages/Clients';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import UserPage from './pages/UserPage';
import Reports from './pages/Reports';
import Teams from './pages/Teams';
import SavedReports from './pages/SavedReports';
import DesktopLogin from './pages/DesktopLogin';
import DownloadReport from './pages/DownloadReport';
import Profile from './pages/Profile';
import Reset from './pages/Reset';

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage['Bearer Token'];

  return useRoutes([
    {
      path: '/dashboard',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'timeline/:id', element: <UserPage /> },
        { path: 'clients', element: <Clients /> },
        { path: 'reports', element: <Reports /> },
        { path: 'teams', element: <Teams /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'setting', element: <Settings /> },
        { path: 'projects', element: <Projects /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      path: 'login',
      element: !token ? <Login /> : <Navigate to="/dashboard/dashboard" />,
    },
    {
      path: 'register',
      element: !token ? <Register /> : <Navigate to="/dashboard/dashboard" />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/dashboard/" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/downloadReportPdf/:id', element: <DownloadReport /> },

        { path: '/reports/sharedReports/:id', element: <SavedReports /> },
        { path: '/auth/:token', element: <DesktopLogin /> },
        { path: '/passwordReset/:id/:token', element: <Reset /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
