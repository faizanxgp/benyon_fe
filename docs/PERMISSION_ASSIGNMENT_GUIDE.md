# Permission Assignment Guide

## Overview

This guide explains how to use the permission assignment functionality on the User Management page, which allows administrators to assign file and folder permissions to users using the `/keycloak/assign_permission` endpoint.

## How to Access

1. Navigate to the **User Management** page (`/user-list-compact`)
2. Find the user you want to manage permissions for
3. Click the **lock icon** (🔒) in the Actions column
4. The "Manage Permissions" modal will open

## Permission Assignment Process

### Step 1: Open Permission Modal
- Click the lock icon next to any user in the User Management table
- The modal will load and show:
  - User information (name and username)
  - Root directory contents
  - Current user permissions

### Step 2: Set Permissions
You have two options:

#### Option A: Grant All Access
- Toggle the **"All Access"** switch at the top
- This grants the user access to all files and folders (root directory access)
- When enabled, individual file/folder toggles are disabled

#### Option B: Grant Individual Access
- Leave "All Access" disabled
- Toggle individual files and folders as needed
- Each item shows:
  - File/folder name
  - Type (File or Folder)
  - Size and modification date (if available)
  - Grant/Deny toggle

### Step 3: Save Changes
- Click **"Save Permissions"** button
- The system will call the `/keycloak/assign_permission` endpoint
- A success message will show what permissions were assigned

## API Integration

### Endpoint Used
```
POST /keycloak/assign_permission
```

### Request Format
The system sends requests in this format:
```json
{
  "resources": [
    {"name": "Beynon Brochures & Certificates", "type": "dir"}, 
    {"name": "document.pdf", "type": "file"}
  ],
  "username": "user@example.com"
}
```

### Resource Types
- `"dir"` - For folders/directories
- `"file"` - For individual files
- `"."` - Special case for root directory (all access)

## Permission Logic

### All Access Mode
When "All Access" is enabled:
- Sends `{"name": ".", "type": "dir"}` as the only resource
- Grants user access to everything in the root directory
- Individual toggles are disabled and show "(via All)"

### Individual Access Mode
When setting individual permissions:
- Each checked item becomes a resource in the array
- Folder items use `"type": "dir"`
- File items use `"type": "file"`
- Empty array means no permissions (removes all access)

## User Feedback

### Success Messages
The system provides detailed feedback:
- **All Access**: "Granted: Full access to all files and folders"
- **Individual Items**: Shows count and list of granted items
- **No Access**: "All permissions removed"

### Error Handling
- Network errors are caught and displayed
- API errors show the server response message
- Loading states prevent duplicate submissions

## Technical Implementation

### Key Functions
- `assignPermissions(username, resources)` - Main API call
- `hasAllPermissions()` - Checks if user has root access
- `hasPermission(itemName)` - Checks individual item access
- `toggleItemPermission()` - Toggles single item
- `toggleAllPermissions()` - Toggles all access

### State Management
- `selectedUserForPermissions` - Currently selected user
- `directoryContents` - List of files/folders to show
- `userPermissions` - Current user permissions
- `savePermissionsLoading` - Prevents duplicate saves

## Example Usage Scenarios

### Scenario 1: Grant Full Access
1. Open permissions for a user
2. Enable "All Access" toggle
3. Click "Save Permissions"
4. Result: User gets access to everything

### Scenario 2: Grant Specific Files
1. Open permissions for a user
2. Keep "All Access" disabled
3. Toggle specific files/folders you want to grant
4. Click "Save Permissions"
5. Result: User gets access only to selected items

### Scenario 3: Remove All Access
1. Open permissions for a user
2. Disable "All Access" (if enabled)
3. Uncheck all individual items
4. Click "Save Permissions"
5. Result: User loses all permissions

## Security Considerations

1. **Admin Access Required**: Only users with appropriate permissions can access User Management
2. **Server Validation**: The backend should validate all permission requests
3. **Audit Trail**: Consider logging permission changes for security auditing
4. **Role-Based Access**: Ensure the requesting user has permission to modify other users' permissions

## Troubleshooting

### Common Issues

1. **"Failed to load users"**: Check backend connectivity and authentication
2. **"Failed to save permissions"**: Verify the `/keycloak/assign_permission` endpoint is available
3. **Empty directory contents**: Check if the root directory API is working
4. **Permission changes not reflected**: Backend may need time to process, or there might be caching issues

### Debug Steps
1. Check browser console for errors
2. Verify API endpoints are responding
3. Confirm user has proper roles/permissions
4. Test with a simple permission assignment first

## Future Enhancements

Potential improvements to consider:
- Bulk permission assignment for multiple users
- Permission templates/presets
- More granular permissions (read/write/execute)
- Permission inheritance for folder structures
- Real-time permission validation
