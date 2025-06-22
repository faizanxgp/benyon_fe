// JWT Test Utility - For testing JWT decoding functionality
// This file demonstrates how the JWT decoding works with sample tokens

import { decodeJWT, getUserRoles, isAdmin, getDashboardHeading } from '../services/api';

// Sample JWT token with admin role (from your api.js file)
const SAMPLE_ADMIN_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtRHgzSGkwcU44Y24tSmVyNUNfTUVGc0NUUUd3RVVLZHRHVi1ITmptS2NjIn0.eyJleHAiOjE3NTA1OTAwOTgsImlhdCI6MTc1MDU3MjA5OCwianRpIjoib25ydHJvOmEwM2Y4Mzg3LTk2ODYtNGU1OS05YTBhLTQ3NGQxMmViZmY0ZiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvdGVhbV9vbmxpbmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjAxNDU3MTktZTc2NS00ZDE1LTgxOTktODYyM2I5YWZjNWVhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVueW9uX2ZlIiwic2lkIjoiNDcwYjQyMWMtNWJhZi00ZGM0LWI5YmItNzkyZmFkYmVkY2VmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXRlYW1fb25saW5lIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJiZW55b25fZmUiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ikhhc3NhYW4gUWF5eXVtIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFzc2FhbnFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ikhhc3NhYW4iLCJmYW1pbHlfbmFtZSI6IlFheXl1bSIsImVtYWlsIjoiaGFzc2FhbnFAZ21haWwuY29tIn0.St1Wb53NR6k1ZbIOstVAZ7KF4kztqeJ0Au0CXcO7PHlu8KlTduzKBVq2hUju2Mq-kDZlE9toPgfc0x0oDPo1ISSpKHOQ5AuXeu5NY1HWtUqXUhH_0JlYO8T6YqXseTKVUKUgqCmACmxvWw0SjJ1CL2tp7UpUoqXMHL03mBhwzOvd5tHY__dxWpHYztEkVbuFe3lrrjvHok8wTHdScre4li7347WNgfV4P2LyfJITyTst2ooAudbC2Ka4lmTqmghBRFRmuH5EKOSq2Tk2VpOREz86tS2joL0AaJqBAMVRdMvqsRdlFJuhIMcp-hWf9tiBf2m1wv5Uk9wIwpL_0HkZIA';

// Function to test JWT decoding
export const testJWTDecoding = () => {
  console.log('=== JWT Decoding Test ===');
  
  // Test 1: Decode the sample token
  const decoded = decodeJWT(SAMPLE_ADMIN_TOKEN);
  console.log('1. Decoded JWT:', decoded);
  
  if (decoded) {
    console.log('2. User email:', decoded.email);
    console.log('3. Token expiration:', new Date(decoded.exp * 1000));
    console.log('4. Resource access:', decoded.resource_access);
    console.log('5. Benyon FE roles:', decoded.resource_access?.benyon_fe?.roles);
  }
  
  // Test 2: Set token in localStorage and test role functions
  localStorage.setItem('access_token', SAMPLE_ADMIN_TOKEN);
  
  const roles = getUserRoles();
  console.log('6. Extracted roles:', roles);
  
  const isUserAdmin = isAdmin();
  console.log('7. Is user admin?', isUserAdmin);
  
  const heading = getDashboardHeading();
  console.log('8. Dashboard heading:', heading);
  
  // Test 3: Test with non-admin user (simulate by removing admin role)
  console.log('\n=== Testing Non-Admin User ===');
  
  // Create a sample token without admin role for testing
  const nonAdminPayload = {
    ...decoded,
    resource_access: {
      benyon_fe: {
        roles: ['user'] // No admin role
      },
      account: {
        roles: ['manage-account', 'view-profile']
      }
    }
  };
  
  // Simulate non-admin scenario by temporarily overriding the function
  const originalGetUserRoles = window.getUserRoles;
  window.getUserRoles = () => ['user']; // Mock non-admin roles
  
  console.log('9. Non-admin dashboard heading:', getDashboardHeading());
  
  // Restore original function
  if (originalGetUserRoles) {
    window.getUserRoles = originalGetUserRoles;
  }
  
  console.log('=== Test Complete ===');
};

// Function to simulate different user scenarios
export const simulateUserScenarios = () => {
  console.log('\n=== User Scenario Simulation ===');
  
  // Scenario 1: Admin user
  localStorage.setItem('access_token', SAMPLE_ADMIN_TOKEN);
  console.log('Scenario 1 - Admin User:');
  console.log('- Roles:', getUserRoles());
  console.log('- Is Admin:', isAdmin());
  console.log('- Sidebar Heading:', getDashboardHeading());
  
  // Scenario 2: Regular user (clear token and simulate)
  localStorage.removeItem('access_token');
  console.log('\nScenario 2 - No Token:');
  console.log('- Roles:', getUserRoles());
  console.log('- Is Admin:', isAdmin());
  console.log('- Sidebar Heading:', getDashboardHeading());
  
  console.log('=== Simulation Complete ===');
};

// Function to test logout functionality
export const testLogoutFunctionality = () => {
  console.log('\n=== Logout Functionality Test ===');
  
  // Set up a test token
  localStorage.setItem('access_token', SAMPLE_ADMIN_TOKEN);
  console.log('1. Token set in localStorage');
  console.log('2. Current roles:', getUserRoles());
  console.log('3. Is authenticated:', isAuthenticated());
  
  // Simulate logout (without actual API call)
  localStorage.removeItem('access_token');
  window.dispatchEvent(new CustomEvent('userLogout'));
  
  console.log('4. After simulated logout:');
  console.log('   - Token in localStorage:', localStorage.getItem('access_token'));
  console.log('   - Current roles:', getUserRoles());
  console.log('   - Is authenticated:', isAuthenticated());
  console.log('   - Sidebar heading:', getDashboardHeading());
  
  console.log('=== Logout Test Complete ===');
};

// Export test functions for use in browser console
window.testJWTDecoding = testJWTDecoding;
window.simulateUserScenarios = simulateUserScenarios;
window.testLogoutFunctionality = testLogoutFunctionality;
window.testLogoutFunctionality = testLogoutFunctionality;
