import React, { useState } from 'react';
import { loginToKeycloak, clearBearerToken, decodeJWT } from '../../services/api';

const TroubleshootLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [diagnostics, setDiagnostics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const performDiagnostics = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    setIsLoading(true);
    setDiagnostics(null);

    const results = {
      timestamp: new Date().toISOString(),
      username: username,
      tests: []
    };

    try {
      // Test 1: Basic login attempt
      results.tests.push({ name: 'Login Attempt', status: 'running', details: 'Attempting login...' });

      try {
        const response = await loginToKeycloak(username, password);
        results.tests[0] = {
          name: 'Login Attempt',
          status: 'success',
          details: 'Login successful',
          data: {
            hasAccessToken: !!response.access_token,
            hasRefreshToken: !!response.refresh_token,
            tokenType: response.token_type,
            expiresIn: response.expires_in
          }
        };

        // Test 2: Token validation
        if (response.access_token) {
          try {
            const decoded = decodeJWT(response.access_token);
            results.tests.push({
              name: 'Token Decode',
              status: 'success',
              details: 'Token decoded successfully',
              data: {
                subject: decoded.sub,
                username: decoded.preferred_username,
                email: decoded.email,
                name: decoded.name,
                roles: decoded.resource_access?.benyon_fe?.roles || [],
                exp: new Date(decoded.exp * 1000).toISOString(),
                iat: new Date(decoded.iat * 1000).toISOString()
              }
            });
          } catch (decodeError) {
            results.tests.push({
              name: 'Token Decode',
              status: 'error',
              details: 'Failed to decode token',
              error: decodeError.message
            });
          }
        }

        // Test 3: Check current localStorage state
        results.tests.push({
          name: 'Local Storage Check',
          status: 'info',
          details: 'Current localStorage state',
          data: {
            hasAccessToken: !!localStorage.getItem('access_token'),
            hasRefreshToken: !!localStorage.getItem('refresh_token'),
            hasTokenExpiry: !!localStorage.getItem('token_expiry'),
            hasUserInfo: !!localStorage.getItem('user_info')
          }
        });

      } catch (loginError) {
        results.tests[0] = {
          name: 'Login Attempt',
          status: 'error',
          details: 'Login failed',
          error: {
            message: loginError.message,
            status: loginError.response?.status,
            statusText: loginError.response?.statusText,
            errorData: loginError.response?.data
          }
        };

        // Additional diagnostics for failed login
        if (loginError.response?.status === 401) {
          results.tests.push({
            name: 'Authentication Analysis',
            status: 'warning',
            details: 'Possible causes for 401 error',
            suggestions: [
              'Password may have been changed in Keycloak Admin Panel',
              'User account may be disabled or locked',
              'User may have required actions pending',
              'Account may not be fully set up',
              'Client configuration may be incorrect'
            ]
          });
        }
      }

      // Test 4: Keycloak endpoint connectivity
      try {
        const connectivityTest = await fetch('http://localhost:8080/realms/team_online/.well-known/openid_configuration');
        if (connectivityTest.ok) {
          const config = await connectivityTest.json();
          results.tests.push({
            name: 'Keycloak Connectivity',
            status: 'success',
            details: 'Keycloak is accessible',
            data: {
              issuer: config.issuer,
              tokenEndpoint: config.token_endpoint,
              authorizationEndpoint: config.authorization_endpoint
            }
          });
        } else {
          throw new Error(`HTTP ${connectivityTest.status}`);
        }
      } catch (connectivityError) {
        results.tests.push({
          name: 'Keycloak Connectivity',
          status: 'error',
          details: 'Cannot reach Keycloak',
          error: connectivityError.message
        });
      }

    } catch (generalError) {
      results.tests.push({
        name: 'General Error',
        status: 'error',
        details: 'Unexpected error during diagnostics',
        error: generalError.message
      });
    }

    setDiagnostics(results);
    setIsLoading(false);
  };

  const clearStoredData = () => {
    clearBearerToken();
    setDiagnostics(null);
    alert('All stored tokens and user data cleared');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'running': return '🔄';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login Troubleshooting Tool</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username/Email
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username or email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={performDiagnostics}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Running Diagnostics...' : 'Run Diagnostics'}
        </button>
        
        <button
          onClick={clearStoredData}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Clear Stored Data
        </button>
      </div>

      {diagnostics && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Diagnostic Results - {new Date(diagnostics.timestamp).toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 mb-4">Username: {diagnostics.username}</p>
          
          <div className="space-y-4">
            {diagnostics.tests.map((test, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getStatusIcon(test.status)}</span>
                  <h4 className={`font-medium ${getStatusColor(test.status)}`}>
                    {test.name}
                  </h4>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{test.details}</p>
                
                {test.data && (
                  <div className="bg-gray-50 rounded p-3 mb-2">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(test.data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {test.error && (
                  <div className="bg-red-50 rounded p-3 mb-2">
                    <pre className="text-xs text-red-700 whitespace-pre-wrap">
                      {JSON.stringify(test.error, null, 2)}
                    </pre>
                  </div>
                )}
                
                {test.suggestions && (
                  <div className="bg-yellow-50 rounded p-3">
                    <p className="text-sm font-medium text-yellow-800 mb-2">Possible Solutions:</p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside">
                      {test.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootLogin;
