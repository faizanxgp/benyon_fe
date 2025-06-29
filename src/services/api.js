// Delete file or folder (form-data, DELETE method)
export const deleteFileOrFolder = (filePath) => {
  const formData = new FormData();
  formData.append('path', filePath);
  return api.delete('/files/delete', {
    data: formData,
    headers: {
      // Let browser set Content-Type for form-data
    },
  });
};
import axios from 'axios';

// Loading management
let loadingCallbacks = {
  show: null,
  hide: null
};

// Function to set loading callbacks from the context
export const setLoadingCallbacks = (showCallback, hideCallback) => {
  loadingCallbacks.show = showCallback;
  loadingCallbacks.hide = hideCallback;
};

// Original token (commented out for reference)
// const BEARER = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtRHgzSGkwcU44Y24tSmVyNUNfTUVGc0NUUUd3RVVLZHRHVi1ITmptS2NjIn0.eyJleHAiOjE3NTA1OTAwOTgsImlhdCI6MTc1MDU3MjA5OCwianRpIjoib25ydHJvOmEwM2Y4Mzg3LTk2ODYtNGU1OS05YTBhLTQ3NGQxMmViZmY0ZiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvdGVhbV9vbmxpbmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjAxNDU3MTktZTc2NS00ZDE1LTgxOTktODYyM2I5YWZjNWVhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVueW9uX2ZlIiwic2lkIjoiNDcwYjQyMWMtNWJhZi00ZGM0LWI5YmItNzkyZmFkYmVkY2VmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXRlYW1fb25saW5lIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJiZW55b25fZmUiOnsicm9zZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ikhhc3NhYW4gUWF5eXVtIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFzc2FhbnFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ikhhc3NhYW4iLCJmYW1pbHlfbmFtZSI6IlFheXl1bSIsImVtYWlsIjoiaGFzc2FhbnFAZ21haWwuY29tIn0.St1Wb53NR6k1ZbIOstVAZ7KF4kztqeJ0Au0CXcO7PHlu8KlTduzKBVq2hUju2Mq-kDZlE9toPgfc0x0oDPo1ISSpKHOQ5AuXeu5NY1HWtUqXUhH_0JlYO8T6YqXseTKVUKUgqCmACmxvWw0SjJ1CL2tp7UpUoqXMHL03mBhwzOvd5tHY__dxWpHYztEkVbuFe3lrrjvHok8wTHdScre4li7347WNgfV4P2LyfJITyTst2ooAudbC2Ka4lmTqmghBRFRmuH5EKOSq2Tk2VpOREz86tS2joL0AaJqBAMVRdMvqsRdlFJuhIMcp-hWf9tiBf2m1wv5Uk9wIwpL_0HkZIA';

// Dynamic bearer token that can be updated after login
let BEARER = localStorage.getItem('access_token') || 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtRHgzSGkwcU44Y24tSmVyNUNfTUVGc0NUUUd3RVVLZHRHVi1ITmptS2NjIn0.eyJleHAiOjE3NTA1OTAwOTgsImlhdCI6MTc1MDU3MjA5OCwianRpIjoib25ydHJvOmEwM2Y4Mzg3LTk2ODYtNGU1OS05YTBhLTQ3NGQxMmViZmY0ZiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvdGVhbV9vbmxpbmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjAxNDU3MTktZTc2NS00ZDE1LTgxOTktODYyM2I5YWZjNWVhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmVueW9uX2ZlIiwic2lkIjoiNDcwYjQyMWMtNWJhZi00ZGM0LWI5YmItNzkyZmFkYmVkY2VmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXRlYW1fb25saW5lIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJiZW55b25fZmUiOnsicm9zZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ikhhc3NhYW4gUWF5eXVtIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFzc2FhbnFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ikhhc3NhYW4iLCJmYW1pbHlfbmFtZSI6IlFheXl1bSIsImVtYWlsIjoiaGFzc2FhbnFAZ21haWwuY29tIn0.St1Wb53NR6k1ZbIOstVAZ7KF4kztqeJ0Au0CXcO7PHlu8KlTduzKBVq2hUju2Mq-kDZlE9toPgfc0x0oDPo1ISSpKHOQ5AuXeu5NY1HWtUqXUhH_0JlYO8T6YqXseTKVUKUgqCmACmxvWw0SjJ1CL2tp7UpUoqXMHL03mBhwzOvd5tHY__dxWpHYztEkVbuFe3lrrjvHok8wTHdScre4li7347WNgfV4P2LyfJITyTst2ooAudbC2Ka4lmTqmghBRFRmuH5EKOSq2Tk2VpOREz86tS2joL0AaJqBAMVRdMvqsRdlFJuhIMcp-hWf9tiBf2m1wv5Uk9wIwpL_0HkZIA';

// Function to update the bearer token
export const updateBearerToken = (newToken) => {
  BEARER = newToken;
  // Store token in localStorage for persistence
  localStorage.setItem('access_token', newToken);
  // Update the authorization header for all future requests
  api.defaults.headers.Authorization = `Bearer ${newToken}`;
};

// Function to clear the bearer token (for logout)
export const clearBearerToken = () => {
  BEARER = '';
  localStorage.removeItem('access_token');
  api.defaults.headers.Authorization = '';
};

// Function to decode JWT token
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT token format');
      return null;
    }
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Function to get user roles from JWT token
export const getUserRoles = () => {
  const token = localStorage.getItem('access_token') || BEARER;
  if (!token) return [];
  
  const decoded = decodeJWT(token);
  if (!decoded) return [];
  
  // Extract benyon_fe roles with proper error handling
  try {
    const benyonFeRoles = decoded.resource_access?.benyon_fe?.roles || [];
    return Array.isArray(benyonFeRoles) ? benyonFeRoles : [];
  } catch (error) {
    console.error('Error extracting roles from JWT:', error);
    return [];
  }
};

// Function to check if user has admin role
export const isAdmin = () => {
  const roles = getUserRoles();
  return roles.includes('admin');
};

// Function to get dashboard heading based on user role
export const getDashboardHeading = () => {
  return isAdmin() ? 'Admin Dashboard' : 'Dashboard';
};

// Function to get user's name from JWT token
export const getUserName = () => {
  const token = localStorage.getItem('access_token') || BEARER;
  if (!token) return 'User';
  
  const decoded = decodeJWT(token);
  if (!decoded) return 'User';
  
  // Extract name from JWT payload
  return decoded.name || decoded.preferred_username || 'User';
};

// Function to get user's username from JWT token
export const getUsername = () => {
  const token = localStorage.getItem('access_token') || BEARER;
  if (!token) return '';
  
  const decoded = decodeJWT(token);
  if (!decoded) return '';
  
  // Extract username (typically preferred_username in Keycloak)
  return decoded.preferred_username || decoded.sub || '';
};

// Function to get user's role label for display
export const getUserRoleLabel = () => {
  const roles = getUserRoles();
  
  if (roles.includes('admin')) {
    return 'admin';
  } else if (roles.includes('standard')) {
    return 'standard';
  }
    // Default fallback
  return 'user';
};

// Function to get user's email from JWT token
export const getUserEmail = () => {
  const token = localStorage.getItem('access_token') || BEARER;
  if (!token) return '';
  
  const decoded = decodeJWT(token);
  if (!decoded) return '';
  
  // Extract email from JWT payload
  return decoded.email || decoded.preferred_username || '';
};

// Function to validate JWT token (check if it's not expired)
export const isTokenValid = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded) return false;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  
  // Use our improved token validation
  if (!isTokenValid(token)) {
    // Token expired or invalid, clear it
    clearBearerToken();
    return false;
  }
  
  return true;
};

// Function to login to Keycloak
export const loginToKeycloak = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'benyon_fe');
    formData.append('scope', 'email openid');
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(
      'http://localhost:8080/realms/team_online/protocol/openid-connect/token',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Option A: Create an instance with header pre-configured
export const api = axios.create({
  baseURL: 'http://localhost:5000', // adjust as needed
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${BEARER}`
  }
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  // Update Authorization header with the latest token
  const currentToken = localStorage.getItem('access_token') || BEARER;
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  
  // Show loading spinner
  if (loadingCallbacks.show) {
    console.log('API Request started - showing loading spinner:', config.url);
    loadingCallbacks.show();
  }
  
  return config;
}, (error) => {
  // Hide loading spinner in case of error
  if (loadingCallbacks.hide) {
    console.log('API Request error - hiding loading spinner');
    loadingCallbacks.hide();
  }
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  // Hide loading spinner on successful response
  if (loadingCallbacks.hide) {
    console.log('API Response success - hiding loading spinner:', response.config.url);
    loadingCallbacks.hide();
  }
  return response;
}, (error) => {
  // Hide loading spinner on error response
  if (loadingCallbacks.hide) {
    console.log('API Response error - hiding loading spinner:', error.config?.url);
    loadingCallbacks.hide();
  }
  return Promise.reject(error);
});

// Users
export const getUsersStatus = () =>
  api.get('/keycloak/users_status');

export const createUser = (data) => api.post('/keycloak/create_user', data);

export const deleteUser = (data) => api.delete('/keycloak/delete_user', { data });

export const toggleUserStatus = (data) => api.post('/keycloak/toggle_user_status', data);

export const logoutUser = () => api.get('/keycloak/logout_user');

// Replace user role
export const replaceUserRole = (data) => api.post('/keycloak/replace_user_role', data);

// Retrieve user details from backend
export const retrieveUserDetails = (username) => 
  api.post('/keycloak/retrieve_user_details', { username });

// Change user password
export const changeUserPassword = (data) => api.post('/keycloak/change_password', data);

// Placeholder for password verification API - to be implemented by backend
export const verifyPassword = (data) => api.post('/keycloak/verify_password', data);

// Get login events for analytics
export const getLoginEvents = () => api.post('/keycloak/login_events', {});

// Files
export const getDirContents = (path = "/") => {
  const formData = new FormData();
  formData.append("path", path);
  return api.post("/files/dir_contents", formData);
};

export const searchFiles = (searchStr) => {
  const formData = new FormData();
  formData.append("search_str", searchStr);
  return api.post("/files/search_files", formData);
};

// Upload multiple files and folders with directory structure
export const uploadMultipleFiles = (files, directoryStructure) => {
  console.log('uploadMultipleFiles called with:', {
    fileCount: files.length,
    files: files.map(f => ({ name: f.name, size: f.size, path: f.webkitRelativePath || f.name })),
    directoryStructure
  });

  const formData = new FormData();
  
  // Append all files to form data - use "file" as the key name for each file
  // Backend expects: files = data.getlist("file")
  files.forEach((file, index) => {
    formData.append('file', file, file.name);
    console.log(`Added file ${index}:`, {
      key: 'file',
      name: file.name, 
      size: file.size,
      type: file.type,
      path: file.webkitRelativePath || 'root'
    });
  });
  
  // Append the directory structure as a serialized JSON string
  const structureJson = JSON.stringify(directoryStructure);
  formData.append('directory_structure', structureJson);
  console.log('Directory structure JSON:', structureJson);
  
  // Debug: Log all form data entries
  console.log('FormData contents:');
  for (let pair of formData.entries()) {
    if (pair[1] instanceof File) {
      console.log(`${pair[0]}:`, `File(${pair[1].name}, ${pair[1].size} bytes)`);
    } else {
      console.log(`${pair[0]}:`, pair[1]);
    }
  }
  
  console.log('Making API call to /files/upload_multiple');
  
  return api.post("/files/upload_multiple", formData, {
    headers: {
      // Don't set Content-Type manually, let browser set it with boundary
      // 'Content-Type': 'multipart/form-data',
    },
    timeout: 30000, // 30 second timeout for uploads
  });
};

// Demo upload function for testing without backend
export const uploadMultipleFilesDemo = (files, directoryStructure) => {
  console.log('DEMO MODE: uploadMultipleFiles called with:', {
    fileCount: files.length,
    files: files.map(f => ({ name: f.name, size: f.size, path: f.webkitRelativePath || f.name })),
    directoryStructure
  });

  console.log('DEMO: FormData would contain:');
  files.forEach((file, index) => {
    console.log(`DEMO: file: File(${file.name}, ${file.size} bytes)`);
  });
  console.log('DEMO: directory_structure:', JSON.stringify(directoryStructure));

  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success response
      resolve({
        data: {
          message: 'Files uploaded successfully (demo mode)',
          uploadedFiles: files.length,
          directoryStructure: directoryStructure,
          receivedFiles: files.map(f => f.name)
        }
      });
    }, 2000);
  });
};

export const getFilePreview = (filePath) => {
  const formData = new FormData();
  formData.append("path", filePath);
  return api.post("/files/file_preview", formData);
};

// PDF page preview function
export const getPdfPagePreview = (filePath, page = 1, quality = 'medium', scale = 1.5) => {
  const formData = new FormData();
  formData.append("path", filePath);
  formData.append("page", page.toString());
  formData.append("quality", quality);
  formData.append("scale", scale.toString());
  return api.post("/files/pdf_page", formData);
};

export const downloadFile = (filePath) => {
  const formData = new FormData();
  formData.append("path", filePath);
  return api.post("/files/download_file", formData, {
    responseType: 'blob' // Important for file downloads
  });
};

// PDF info function
export const getPdfInfo = (filePath) => {
  const formData = new FormData();
  formData.append('path', filePath);
  return api.post('/files/pdf_info', formData);
};

/**
 * LOGOUT FLOW DOCUMENTATION
 * 
 * Complete logout process includes:
 * 1. API call to backend: GET /keycloak/logout_user (with Bearer token)
 * 2. Clear client-side token from localStorage
 * 3. Clear Authorization header from axios instance
 * 4. Dispatch 'userLogout' event to update UI components
 * 5. Navigate user to login page
 * 6. Sidebar heading automatically resets to 'Dashboard'
 * 
 * The logout function handles errors gracefully - if backend call fails,
 * client-side cleanup still occurs to ensure user is logged out locally.
 */

// Function to logout user
export const logout = async () => {
  try {
    // Make API call to backend logout endpoint
    await logoutUser();
    console.log('User logged out successfully from backend');
  } catch (error) {
    console.error('Backend logout error:', error);
    // Continue with client-side cleanup even if backend call fails
  } finally {
    // Always clear client-side token and update UI
    clearBearerToken();
    
    // Dispatch logout event to update UI components
    window.dispatchEvent(new CustomEvent('userLogout'));
  }
};

// Function to set up automatic token expiry monitoring
export const setupTokenExpiryMonitoring = () => {
  // Check token expiry every 5 minutes
  const EXPIRY_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  const checkTokenExpiry = () => {
    const token = localStorage.getItem('access_token');
    if (token && !isTokenValid(token)) {
      console.log('Token expired, clearing authentication');
      clearBearerToken();
      
      // Dispatch logout event to update UI
      window.dispatchEvent(new CustomEvent('userLogout'));
      
      // Only redirect if we're not already on the login page
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/auths/')) {
        window.location.href = '/auths/auth-login-v2';
      }
    }
  };
  
  // Start monitoring
  const intervalId = setInterval(checkTokenExpiry, EXPIRY_CHECK_INTERVAL);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};

// Function to change user password
export const changePassword = async (newPassword) => {
  try {
    // Here you would typically make an API call to your backend
    // For demonstration, we'll simulate the API call
    
    // Example API call structure:
    // const response = await api.post('/api/auth/change-password', {
    //   newPassword: newPassword
    // });
    
    // For now, simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Password updated successfully' };
      } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to update password. Please try again.');
  }
};

// Function to get user permissions
export const getUserPermissions = async (username) => {
  try {
    const response = await api.post('/keycloak/get_user_permissions', {
      username: username
    });
    return response;
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    throw error;
  }
};

// Function to set user permissions
export const setUserPermissions = async (username, resourceName, grant = true) => {
  try {
    const response = await api.post('/keycloak/set_user_permissions', {
      username: username,
      resource_name: resourceName,
      grant: grant
    });
    return response;
  } catch (error) {
    console.error('Error setting user permissions:', error);
    throw error;
  }
};

// Function to assign permissions to a user (bulk permission assignment)
export const assignPermissions = async (username, resources) => {
  try {
    const response = await api.post('/keycloak/assign_permission', {
      username: username,
      resources: resources
    });
    return response;
  } catch (error) {
    console.error('Error assigning permissions:', error);
    throw error;
  }
};

// Function to unassign permissions from a user (bulk permission removal)
export const unassignPermissions = async (username, resourceNames) => {
  try {
    const response = await api.post('/keycloak/unassign_permission', {
      username: username,
      resource_names: resourceNames
    });
    return response;
  } catch (error) {
    console.error('Error unassigning permissions:', error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (username, profileData) => {
  try {
    // Here you would typically make an API call to your backend
    // For demonstration, we'll simulate the API call
    
    // Example API call structure:
    // const response = await api.put(`/api/users/${username}/profile`, profileData);
    
    // For now, simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      message: 'Profile updated successfully',
      data: profileData
    };
    
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }
};