import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

/**
 * ProtectedRoute Component
 * 
 * This component protects routes from unauthorized access.
 * It checks if the user is authenticated and redirects to login if not.
 * 
 * Features:
 * - Redirects unauthenticated users to login page
 * - Preserves the intended destination URL for post-login redirect
 * - Automatically clears expired tokens
 */

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Store the current location so we can redirect back after login
    const from = location.pathname + location.search;
    
    // Redirect to login page with state to remember where they came from
    return (
      <Navigate 
        to="/auths/auth-login-v2" 
        state={{ from }} 
        replace 
      />
    );
  }
  
  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
