import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

/**
 * PublicRoute Component
 * 
 * This component protects authentication pages from already authenticated users.
 * If a user is already authenticated and tries to access login page, 
 * they get redirected to the dashboard.
 * 
 * Use this for pages like login, register, forgot password, etc.
 */

const PublicRoute = ({ children }) => {
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/analytics" replace />;
  }
  
  // User is not authenticated, allow access to auth pages
  return children;
};

export default PublicRoute;
