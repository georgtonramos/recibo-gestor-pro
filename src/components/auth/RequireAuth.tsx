
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type RequireAuthProps = {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'employee'>;
};

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-receipt-500 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page if not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard if user doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
