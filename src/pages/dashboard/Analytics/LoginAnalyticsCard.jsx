import React, { useState, useEffect } from 'react';
import { Card, Icon, Button } from '../../../componenets';
import { getLoginEvents } from '../../../services/api';

const LoginAnalyticsCard = ({ className }) => {
    const [loginData, setLoginData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAllLoginsModal, setShowAllLoginsModal] = useState(false);

    // Process login data to get summary statistics
    const processLoginData = (data) => {
        if (!Array.isArray(data)) return { 
            uniqueUsers: 0, 
            totalLogins: 0, 
            recentLogins: [], 
            topUsers: [],
            todayLogins: 0,
            last24HoursLogins: []
        };

        const userLoginMap = new Map();
        const allLogins = [];
        const today = new Date().toDateString();
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Process each login event
        data.forEach(loginEvent => {
            if (typeof loginEvent === 'object' && loginEvent !== null) {
                Object.entries(loginEvent).forEach(([username, timestamp]) => {
                    const loginDate = new Date(timestamp);
                    
                    // Track logins per user
                    if (!userLoginMap.has(username)) {
                        userLoginMap.set(username, []);
                    }
                    userLoginMap.get(username).push(timestamp);
                    
                    // Add to all logins for recent activity
                    allLogins.push({
                        username,
                        timestamp: loginDate,
                        displayTime: loginDate.toLocaleString(),
                        displayDate: loginDate.toLocaleDateString(),
                        displayTimeOnly: loginDate.toLocaleTimeString()
                    });
                });
            }
        });

        // Sort recent logins by timestamp (newest first)
        allLogins.sort((a, b) => b.timestamp - a.timestamp);

        // Calculate today's logins
        const todayLogins = allLogins.filter(login => 
            login.timestamp.toDateString() === today
        ).length;

        // Get logins from last 24 hours
        const last24HoursLogins = allLogins.filter(login => 
            login.timestamp >= twentyFourHoursAgo
        );

        // Get top users by login frequency
        const topUsers = Array.from(userLoginMap.entries())
            .map(([username, logins]) => ({
                username,
                loginCount: logins.length,
                lastLogin: new Date(Math.max(...logins.map(t => new Date(t)))).toLocaleString()
            }))
            .sort((a, b) => b.loginCount - a.loginCount)
            .slice(0, 3);

        return {
            uniqueUsers: userLoginMap.size,
            totalLogins: allLogins.length,
            recentLogins: allLogins.slice(0, 3), // Show only 3 most recent
            topUsers,
            todayLogins,
            last24HoursLogins
        };
    };

    const fetchLoginEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching login events...');
            
            const response = await getLoginEvents();
            console.log('Login events response:', response.data);
            
            setLoginData(response.data || []);
        } catch (error) {
            console.error('Error fetching login events:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch login events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoginEvents();
    }, []);

    const stats = processLoginData(loginData);

    return (
        <>
            <Card className={`h-full ${className || ''}`}>
                <Card.Body>
                <div className="flex justify-between items-start gap-2 mb-5">
                    <div>
                        <h6 className="font-heading text-sm -tracking-snug leading-tighter font-bold text-slate-700 dark:text-white mb-1">
                            Login Analytics
                        </h6>
                        <p className="text-xs leading-5 text-slate-400">
                            User login activity and statistics
                        </p>
                    </div>
                    <Button.Zoom 
                        size="sm" 
                        onClick={fetchLoginEvents}
                        disabled={loading}
                        title="Refresh login data"
                    >
                        <Icon className={`text-base text-slate-400 dark:text-slate-300 ${loading ? 'animate-spin' : ''}`} name="refresh" />
                    </Button.Zoom>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                        <div className="flex items-center gap-2">
                            <Icon className="text-red-500" name="alert-circle" />
                            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Loading login data...</span>
                    </div>
                ) : (
                    <>
                        {/* Statistics Summary */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="text-center p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                <div className="text-xl font-bold text-primary-600 mb-1">
                                    {stats.uniqueUsers}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Unique Users
                                </div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                <div className="text-xl font-bold text-green-600 mb-1">
                                    {stats.totalLogins}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Total Logins
                                </div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                <div className="text-xl font-bold text-blue-600 mb-1">
                                    {stats.todayLogins}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Today
                                </div>
                            </div>
                        </div>

                        {/* Top Users by Login Frequency */}
                        {stats.topUsers.length > 0 && (
                            <div className="mb-6">
                                <h6 className="font-medium text-sm text-slate-700 dark:text-white mb-3 flex items-center gap-2">
                                    <Icon className="text-base text-orange-600" name="star" />
                                    Most Active Users
                                </h6>
                                <div className="space-y-2">
                                    {stats.topUsers.map((user, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-900 rounded-md"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                                    index === 0 ? 'bg-yellow-500' : 
                                                    index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-700 dark:text-white">
                                                        {user.username}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        Last: {user.lastLogin}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold text-primary-600">
                                                {user.loginCount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Login Activity */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h6 className="font-medium text-sm text-slate-700 dark:text-white flex items-center gap-2">
                                    <Icon className="text-base text-primary-600" name="clock" />
                                    Recent Login Activity
                                </h6>
                                {stats.last24HoursLogins.length > 3 && (
                                    <button
                                        onClick={() => setShowAllLoginsModal(true)}
                                        className="flex items-center justify-center w-6 h-6 text-slate-400 hover:text-primary-600 transition-colors"
                                        title="View all logins from last 24 hours"
                                    >
                                        <Icon className="text-sm" name="more-h" />
                                    </button>
                                )}
                            </div>
                            
                            {stats.recentLogins.length > 0 ? (
                                <div className="space-y-2">
                                    {stats.recentLogins.map((login, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-900 rounded-md"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                                    <Icon className="text-sm text-primary-600" name="user" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-700 dark:text-white">
                                                        {login.username}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        {login.displayTime}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <Icon className="text-3xl text-slate-300 dark:text-slate-600 mx-auto mb-2" name="users" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        No login activity found
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>

        {/* All Logins Modal */}
        {showAllLoginsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAllLoginsModal(false)}>
                <div 
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
                                All Login Activity (Last 24 Hours)
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {stats.last24HoursLogins.length} login attempts found
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAllLoginsModal(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Icon className="text-lg text-slate-400" name="cross" />
                        </button>
                    </div>
                    
                    <div className="p-6 max-h-96 overflow-y-auto">
                        {stats.last24HoursLogins.length > 0 ? (
                            <div className="space-y-3">
                                {stats.last24HoursLogins.map((login, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-900 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                                <Icon className="text-base text-primary-600" name="user" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-700 dark:text-white">
                                                    {login.username}
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                    <span>{login.displayDate}</span>
                                                    <span>•</span>
                                                    <span>{login.displayTimeOnly}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {index === 0 ? 'Latest' : `${index + 1}`}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Icon className="text-4xl text-slate-300 dark:text-slate-600 mx-auto mb-4" name="users" />
                                <h4 className="text-lg font-medium text-slate-700 dark:text-white mb-2">
                                    No Login Activity
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    No login attempts found in the last 24 hours
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default LoginAnalyticsCard;
