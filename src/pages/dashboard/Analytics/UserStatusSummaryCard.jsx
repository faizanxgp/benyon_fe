import React, { useEffect, useState } from 'react';
import { Card, Icon } from '../../../componenets';
import { getUsersStatus } from '../../../services/api';

const UserStatusSummaryCard = () => {
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    enabled: 0,
    suspended: 0,
    roles: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsersSummary();
  }, []);

  const fetchUsersSummary = () => {
    setLoading(true);
    setError(null);
    
    getUsersStatus()
      .then(res => {
        if (!res.data || !res.data.detail) {
          throw new Error('Invalid API response structure');
        }
        
        const detail = res.data.detail;
        const users = Object.entries(detail).map(([username, userObj]) => {
          if (!userObj || typeof userObj !== 'object') {
            return null;
          }
          
          const { full_name, email, role, session_status, enabled } = userObj;
          
          if (!full_name || !email || !role || session_status === undefined || enabled === undefined) {
            return null;
          }
          
          return {
            username,
            role,
            session_status,
            enabled
          };
        }).filter(user => user !== null);
        
        // Calculate summary statistics
        const totalUsers = users.length;
        const activeUsers = users.filter(user => user.session_status === 'active').length;
        const inactiveUsers = users.filter(user => user.session_status === 'inactive').length;
        const enabledUsers = users.filter(user => user.enabled === true).length;
        const suspendedUsers = users.filter(user => user.enabled === false).length;
        
        // Count users by role
        const roleCount = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});
        
        setSummary({
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers,
          enabled: enabledUsers,
          suspended: suspendedUsers,
          roles: roleCount
        });
      })
      .catch(err => {
        console.error('Error fetching users status:', err);
        setError('Failed to load user status data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Card>
        <Card.Body>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <div className="text-center py-8">
            <Icon className="text-4xl text-red-500 mb-2" name="alert-circle" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            User Status Summary
          </h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.location.href = '/user-list-compact'}
              className="px-3 py-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30 rounded-md transition-colors duration-200"
              title="Go to User Management to add users and view details"
            >
              Add / Manage Users
            </button>
            <button 
              onClick={fetchUsersSummary}
              className="text-primary-600 hover:text-primary-700 transition-colors"
              title="Refresh data"
            >
              <Icon className="text-lg" name="refresh" />
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Total Users */}
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                <Icon className="text-2xl text-blue-600 dark:text-blue-400" name="users" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {summary.total}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Users
            </div>
          </div>

          {/* Session Status Stacked Bar Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Session Status
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active: {summary.active}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Inactive: {summary.inactive}</span>
                  </div>
                </div>
                <span className="font-medium">Total: {summary.total}</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-out"
                    style={{ width: `${summary.total > 0 ? (summary.active / summary.total) * 100 : 0}%` }}
                  ></div>
                  <div 
                    className="bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-700 ease-out"
                    style={{ width: `${summary.total > 0 ? (summary.inactive / summary.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Stacked Bar Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Account Status
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon className="text-emerald-600 dark:text-emerald-400 text-xs" name="check-circle" />
                    <span>Enabled: {summary.enabled}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon className="text-red-600 dark:text-red-400 text-xs" name="x-circle" />
                    <span>Suspended: {summary.suspended}</span>
                  </div>
                </div>
                <span className="font-medium">Total: {summary.total}</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out"
                    style={{ width: `${summary.total > 0 ? (summary.enabled / summary.total) * 100 : 0}%` }}
                  ></div>
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-600 transition-all duration-700 ease-out"
                    style={{ width: `${summary.total > 0 ? (summary.suspended / summary.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Roles Distribution Stacked Bar Chart */}
          {Object.keys(summary.roles).length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                User Roles Distribution
              </h4>
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {Object.entries(summary.roles)
                    .sort(([,a], [,b]) => b - a) // Sort by count descending
                    .map(([role, count], index) => {
                      const colors = [
                        'bg-blue-500',
                        'bg-purple-500',
                        'bg-pink-500',
                        'bg-indigo-500',
                        'bg-cyan-500',
                        'bg-teal-500'
                      ];
                      const colorClass = colors[index % colors.length];
                      
                      return (
                        <div key={role} className="flex items-center space-x-1">
                          <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
                          <span className="capitalize">{role}: {count}</span>
                        </div>
                      );
                    })}
                  <span className="font-medium ml-auto">Total: {summary.total}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div className="h-full flex">
                    {Object.entries(summary.roles)
                      .sort(([,a], [,b]) => b - a) // Sort by count descending
                      .map(([role, count], index) => {
                        const percentage = summary.total > 0 ? (count / summary.total) * 100 : 0;
                        const gradients = [
                          'from-blue-400 to-blue-600',
                          'from-purple-400 to-purple-600',
                          'from-pink-400 to-pink-600',
                          'from-indigo-400 to-indigo-600',
                          'from-cyan-400 to-cyan-600',
                          'from-teal-400 to-teal-600'
                        ];
                        const gradientClass = gradients[index % gradients.length];
                        
                        return (
                          <div 
                            key={role}
                            className={`bg-gradient-to-r ${gradientClass} transition-all duration-700 ease-out`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserStatusSummaryCard;
