# JWT Role-Based Sidebar Heading Feature

## Overview

This feature implements dynamic sidebar headings based on user roles extracted from JWT tokens. When a user logs in and receives a JWT access token, the system decodes it to check for admin privileges and updates the sidebar heading accordingly.

## How It Works

### 1. JWT Token Structure

The system expects JWT tokens with the following structure:

```json
{
  "exp": 1750595859,
  "resource_access": {
    "benyon_fe": {
      "roles": [
        "admin"  // or other roles like "user"
      ]
    },
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  }
  // ... other JWT claims
}
```

### 2. Role-Based Heading Logic

- **Admin User**: If `resource_access.benyon_fe.roles` contains `"admin"`, the sidebar heading displays **"Admin Dashboard"**
- **Regular User**: If admin role is not found, the heading displays **"Dashboard"**

### 3. Implementation Details

#### API Service Functions (`src/services/api.js`)

- `decodeJWT(token)` - Decodes JWT token and returns payload
- `getUserRoles()` - Extracts benyon_fe roles from stored token
- `isAdmin()` - Checks if user has admin role
- `getDashboardHeading()` - Returns appropriate heading based on role
- `logout()` - Clears token and dispatches logout event

#### Menu Component (`src/layout/sidebar/Menu.jsx`)

- Uses React state to manage dynamic heading
- Listens for `userLogin` and `userLogout` custom events
- Updates menu data when user role changes

#### Login Component (`src/pages/auths/LoginV2.jsx`)

- Dispatches `userLogin` event after successful authentication
- Stores JWT token in localStorage

#### User Dropdown (`src/layout/components/UserDropdown.jsx`)

- Integrates with logout functionality
- Dispatches `userLogout` event on sign out

### 4. Event System

The feature uses custom browser events for component communication:

```javascript
// Login event
window.dispatchEvent(new CustomEvent('userLogin', { 
  detail: { token: response.access_token } 
}));

// Logout event
window.dispatchEvent(new CustomEvent('userLogout'));
```

### 5. Error Handling

- Invalid JWT format handling
- Token expiration checking
- Graceful fallbacks to default heading
- Console error logging for debugging

### 6. Testing

Use the test utility in `src/utils/jwtTest.js`:

```javascript
// In browser console
testJWTDecoding();
simulateUserScenarios();
```

## Usage Flow

1. User logs in via LoginV2 component
2. JWT token is received and stored
3. `userLogin` event is dispatched
4. Menu component updates heading based on decoded roles
5. User sees "Admin Dashboard" or "Dashboard" accordingly
6. On logout, heading resets to "Dashboard"

## Security Considerations

- JWT validation includes expiration checking
- Tokens are stored in localStorage with proper cleanup
- Role checking is fail-safe (defaults to non-admin)
- Client-side role checking is for UI purposes only - server-side authorization is still required

## Customization

To modify role logic or add new roles:

1. Update `getUserRoles()` function in `api.js`
2. Modify `getDashboardHeading()` for custom heading logic
3. Add new role checking functions as needed

## Dependencies

- React hooks (useState, useEffect)
- React Router for navigation
- Browser's native `atob()` for JWT decoding
- localStorage for token persistence
