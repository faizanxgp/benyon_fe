# 🛡️ Authentication & Route Protection System

This document describes the complete authentication and route protection system implemented in the DashWind React application.

## 🔍 Overview

The system provides comprehensive authentication and authorization features including:

- **JWT Token Management**: Secure token handling with automatic expiry detection
- **Role-Based Access**: Dynamic UI changes based on user roles (admin vs regular user)
- **Route Protection**: Prevents unauthorized access to protected pages
- **Automatic Redirects**: Smart redirection logic for better user experience
- **Session Management**: Automatic token expiry monitoring and cleanup

## 🏗️ Architecture

### Core Components

1. **Authentication API** (`src/services/api.js`)
   - JWT token decoding and validation
   - User role extraction and management
   - Login/logout functionality
   - Automatic token expiry monitoring

2. **Route Protection** (`src/route/`)
   - `ProtectedRoute.jsx`: Protects authenticated routes
   - `PublicRoute.jsx`: Prevents authenticated users from accessing auth pages
   - `RootRedirect.jsx`: Handles base URL redirection logic

3. **UI Components**
   - Dynamic sidebar headings based on user roles
   - Login/logout functionality in user dropdown
   - Automatic UI updates on authentication state changes

## 🔐 Authentication Flow

### Login Process
```
1. User submits credentials → LoginV2Page
2. API call to Keycloak → loginToKeycloak()
3. JWT token received → updateBearerToken()
4. Token stored in localStorage
5. Custom 'userLogin' event dispatched
6. UI components update (sidebar heading)
7. User redirected to intended destination
```

### Logout Process
```
1. User clicks Sign Out → UserDropdown
2. API call to backend → GET /keycloak/logout_user
3. Client-side cleanup → clearBearerToken()
4. Custom 'userLogout' event dispatched
5. UI components reset
6. User redirected to login page
```

## 🛡️ Route Protection

### Protected Routes
All application routes except authentication pages require authentication:
- Dashboard pages (`/analytics`, `/ecommerce`, etc.)
- Application pages (`/apps-file-manager`, `/apps-inbox`, etc.)
- User management pages (`/user-list-compact`, etc.)
- All component documentation pages

### Public Routes
Authentication pages that don't require login:
- `/auths/auth-login-v2` (primary login page)
- `/auths/auth-register-v2` (registration)
- `/auths/auth-reset-v2` (password reset)
- Error pages (`/errors/404-modern`, etc.)

### Redirection Logic

| User Status | Accessing | Redirected To | Reason |
|-------------|-----------|---------------|---------|
| Not Authenticated | Protected URL | `/auths/auth-login-v2` | Requires login |
| Not Authenticated | Base URL `/` | `/auths/auth-login-v2` | Requires login |
| Authenticated | Base URL `/` | `/analytics` | Default dashboard |
| Authenticated | Auth pages | `/analytics` | Already logged in |
| Expired Token | Any protected page | `/auths/auth-login-v2` | Token invalid |

## 🎭 Role-Based Features

### Admin Users
- Sidebar heading: **"Admin Dashboard"**
- Full access to all features
- JWT contains: `resource_access.benyon_fe.roles: ["admin"]`

### Regular Users
- Sidebar heading: **"Dashboard"**
- Standard user access
- JWT contains: `resource_access.benyon_fe.roles: [other roles]`

## ⚙️ Token Management

### JWT Token Structure
```json
{
  "exp": 1750595859,
  "resource_access": {
    "benyon_fe": {
      "roles": ["admin"]
    },
    "account": {
      "roles": ["manage-account", "view-profile"]
    }
  },
  "email": "user@example.com",
  "name": "User Name"
}
```

### Automatic Expiry Monitoring
- Checks token validity every 5 minutes
- Automatically clears expired tokens
- Redirects to login if token expired
- Prevents API calls with invalid tokens

## 🔧 Key Functions

### Authentication Functions
```javascript
// Check if user is authenticated
isAuthenticated() → boolean

// Decode JWT token
decodeJWT(token) → object | null

// Get user roles from token
getUserRoles() → string[]

// Check if user has admin role
isAdmin() → boolean

// Get dynamic sidebar heading
getDashboardHeading() → string

// Login to Keycloak
loginToKeycloak(username, password) → Promise

// Logout user
logout() → Promise
```

### Token Management Functions
```javascript
// Update bearer token
updateBearerToken(newToken) → void

// Clear bearer token
clearBearerToken() → void

// Validate token expiry
isTokenValid(token) → boolean

// Set up automatic monitoring
setupTokenExpiryMonitoring() → cleanup function
```

## 🧪 Testing

### Manual Testing Scenarios

1. **Unauthenticated Access**
   ```
   1. Clear localStorage
   2. Visit http://localhost:5173/apps-file-manager
   3. Should redirect to login page
   ```

2. **Base URL Access**
   ```
   1. Without login: Visit http://localhost:5173/
   2. Should redirect to login page
   3. After login: Visit http://localhost:5173/
   4. Should redirect to analytics dashboard
   ```

3. **Post-Login Redirect**
   ```
   1. Try to access /apps-file-manager without login
   2. Get redirected to login
   3. Complete login
   4. Should be redirected back to /apps-file-manager
   ```

4. **Role-Based Sidebar**
   ```
   1. Login with admin role
   2. Sidebar should show "Admin Dashboard"
   3. Login with non-admin role
   4. Sidebar should show "Dashboard"
   ```

### Automated Testing
Run in browser console:
```javascript
// Test route protection
testRouteProtection()

// Test URL access patterns
testURLAccess()

// Simulate user scenarios
simulateUserScenarios()
```

## 🔄 Event System

The system uses custom browser events for component communication:

### Events Dispatched
- `userLogin`: When user successfully logs in
- `userLogout`: When user logs out or token expires

### Event Listeners
- `Menu.jsx`: Updates sidebar heading on login/logout
- `App.jsx`: Sets up token expiry monitoring

## 🚨 Security Considerations

1. **Client-Side Token Storage**: Tokens are stored in localStorage
   - Vulnerable to XSS attacks
   - Consider httpOnly cookies for production

2. **JWT Validation**: Only checks expiry and format client-side
   - Server-side validation is required for actual security
   - Client-side checks are for UX only

3. **Route Protection**: Frontend route protection only
   - Backend APIs must validate tokens independently
   - Frontend protection is for user experience

4. **Token Transmission**: Uses HTTPS in production
   - Tokens sent in Authorization header
   - Automatic inclusion in API requests

## 📝 Configuration

### Environment Variables
```javascript
// API URLs (in api.js)
const KEYCLOAK_URL = 'http://localhost:8080/realms/team_online/protocol/openid-connect/token'
const BACKEND_URL = 'http://localhost:5000'
```

### Customization
- Change default redirect destination in `RootRedirect.jsx`
- Modify token expiry check interval in `setupTokenExpiryMonitoring()`
- Update role-based headings in `getDashboardHeading()`
- Customize protected/public routes in `index.jsx`

## 🔮 Future Enhancements

1. **Refresh Token Support**: Implement automatic token refresh
2. **Remember Me**: Extended session duration option
3. **Multi-Factor Authentication**: Additional security layer
4. **Session Timeout Warning**: Warn users before auto-logout
5. **Audit Logging**: Track authentication events
6. **Role-Based Route Access**: Different routes for different roles

---

*This authentication system provides a robust foundation for secure user management while maintaining an excellent user experience.*
