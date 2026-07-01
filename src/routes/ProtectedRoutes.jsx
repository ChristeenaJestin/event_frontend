import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';

// allowedRoles: optional array e.g. ['SUPER_ADMIN','ADMIN','ORGANIZER']
// if not provided: any authenticated user passes through
function ProtectedRoutes({ allowedRoles }) {
  const { user, loading, hasRole } = useAuth();

  if (loading) return <Loader label="Checking session…" />;
  if (!user)   return <Navigate to="/login" replace />;
  if (allowedRoles && !hasRole(...allowedRoles))
               return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
