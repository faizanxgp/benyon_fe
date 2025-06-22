import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

/**
 * RootRedirect Component
 * 
 * This component handles the root path ("/") redirection logic:
 * - If user is authenticated: redirect to analytics dashboard
 * - If user is not authenticated: redirect to login page
 * 
 * This ensures that users who visit the base URL get the appropriate experience.
 */

const RootRedirect = () => {
  if (isAuthenticated()) {
    // User is authenticated, redirect to the default dashboard
    return <Navigate to="/analytics" replace />;
  } else {
    // User is not authenticated, redirect to login
    return <Navigate to="/auths/auth-login-v2" replace />;
  }
};

export default RootRedirect;
