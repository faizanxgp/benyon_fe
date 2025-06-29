// Test file for permission assignment functionality
// This demonstrates how the assign_permission endpoint should be called

import { assignPermissions } from '../services/api';

// Example 1: Assign specific files and folders
export const testSpecificPermissions = async () => {
  const username = "mianfaizanxgp@gmail.com";
  const resources = [
    {"name": "Beynon Brochures & Certificates", "type": "dir"}, 
    {"name": "efgh", "type": "file"}
  ];

  try {
    const response = await assignPermissions(username, resources);
    console.log('Success:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Example 2: Assign all access (root directory)
export const testAllPermissions = async () => {
  const username = "mianfaizanxgp@gmail.com";
  const resources = [
    {"name": ".", "type": "dir"}
  ];

  try {
    const response = await assignPermissions(username, resources);
    console.log('Success:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Example 3: Remove all permissions (empty array)
export const testRemovePermissions = async () => {
  const username = "mianfaizanxgp@gmail.com";
  const resources = [];

  try {
    const response = await assignPermissions(username, resources);
    console.log('Success:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Example 4: Multiple files and folders
export const testMultiplePermissions = async () => {
  const username = "mianfaizanxgp@gmail.com";
  const resources = [
    {"name": "Documents", "type": "dir"},
    {"name": "Images", "type": "dir"},
    {"name": "report.pdf", "type": "file"},
    {"name": "data.xlsx", "type": "file"},
    {"name": "presentation.pptx", "type": "file"}
  ];

  try {
    const response = await assignPermissions(username, resources);
    console.log('Success:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Test function to validate the API call format
export const validateApiCallFormat = (username, resources) => {
  // Validate username
  if (!username || typeof username !== 'string') {
    throw new Error('Username is required and must be a string');
  }

  // Validate resources array
  if (!Array.isArray(resources)) {
    throw new Error('Resources must be an array');
  }

  // Validate each resource
  resources.forEach((resource, index) => {
    if (!resource.name || typeof resource.name !== 'string') {
      throw new Error(`Resource ${index}: name is required and must be a string`);
    }
    
    if (!resource.type || !['dir', 'file'].includes(resource.type)) {
      throw new Error(`Resource ${index}: type must be either 'dir' or 'file'`);
    }
  });

  return true;
};

// Usage examples in the browser console:
// import { testSpecificPermissions, testAllPermissions } from './demo/permission-test.js';
// testSpecificPermissions();
// testAllPermissions();
