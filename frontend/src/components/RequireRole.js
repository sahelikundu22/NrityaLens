import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ role, children }) => {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) return <Navigate to="/" replace />;
  const userRole = user?.publicMetadata?.role;
  if (!userRole) return <Navigate to="/onboarding" replace />;
  if (userRole !== role) return <Navigate to={`/${userRole}`} replace />;
  return children;
};

export default RequireRole;


