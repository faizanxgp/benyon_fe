import React, { Fragment, useState, useEffect } from 'react'
import { Menu } from '@headlessui/react'
import { Avatar, Icon } from '../../componenets'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../context'
import { logout, getUserName, getUserRoleLabel } from '../../services/api'

const UserDropdown = () => {
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();
    const navigate = useNavigate();
    
    // State for user information
    const [userName, setUserName] = useState(getUserName());
    const [userRole, setUserRole] = useState(getUserRoleLabel());
    
    // Update user info when login/logout events occur
    useEffect(() => {
        const updateUserInfo = () => {
            setUserName(getUserName());
            setUserRole(getUserRoleLabel());
        };
        
        // Listen for login and logout events
        window.addEventListener('userLogin', updateUserInfo);
        window.addEventListener('userLogout', updateUserInfo);
        
        // Cleanup
        return () => {
            window.removeEventListener('userLogin', updateUserInfo);
            window.removeEventListener('userLogout', updateUserInfo);
        };
    }, []);
    
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auths/auth-login-v2');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still navigate to login page even if logout API fails
            navigate('/auths/auth-login-v2');
        }
    };
  return (
    <Menu as="div" className="dropdown relative">
        {({ open }) => (
            <>
            <Menu.Button className={`dropdown-toggle *:pointer-events-none peer inline-flex items-center group`}>
                <div className="flex items-center">
                    <Avatar rounded icon="user-alt" size="sm" variant="primary"/>
                    <div className="hidden md:block ms-4 text-start">
                        <div className="text-xs font-medium leading-none pt-0.5 pb-1.5 text-primary-500 group-hover:text-primary-600 capitalize">{userRole}</div>
                        <div className="text-slate-600 dark:text-white text-xs font-bold flex items-center">{userName} <em className="text-sm leading-none ms-1 ni ni-chevron-down"></em></div>
                    </div>
                </div>
            </Menu.Button>
            <Menu.Items modal={false} className="dropdown-menu absolute end-0 top-full mt-2.5 max-xs:min-w-[240px] max-xs:max-w-[240px] min-w-[280px] max-w-[280px] border border-t-3 border-gray-200 dark:border-gray-800 border-t-primary-600 dark:border-t-primary-600 bg-white dark:bg-gray-950 rounded shadow z-[1000]">
                <div className="hidden sm:block px-7 py-5 bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                        <Avatar rounded text={userName.split(' ').map(n => n[0]).join('').toUpperCase()} size="rg" variant="primary"/>
                        <div className="ms-4 flex flex-col text-start">
                            <span className="text-sm font-bold text-slate-700 dark:text-white">{userName}</span>
                            <span className="text-xs text-slate-400 mt-1 capitalize">{userRole}</span>
                        </div>
                    </div>
                </div>
                <ul className="py-3">
                    <li>
                        <Menu.Item as={Fragment}>
                            <Link className="relative px-7 py-2.5 flex items-center rounded-[inherit] text-sm leading-5 font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 transition-all duration-300" to="/user-profile-regular?tab=0">
                                <Icon className="text-lg leading-none w-7" name="user-alt" />
                                <span>View Profile</span>
                            </Link>
                        </Menu.Item>
                    </li>
                    <li>
                        <Menu.Item as={Fragment}>
                            <Link className="relative px-7 py-2.5 flex items-center rounded-[inherit] text-sm leading-5 font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 transition-all duration-300" to="/user-profile-regular?tab=1">
                                <Icon className="text-lg leading-none w-7" name="activity" />
                                <span>Account Activity</span>
                            </Link>
                        </Menu.Item>
                    </li>
                    <li>
                        <Menu.Item as={Fragment}>
                            <Link className="relative px-7 py-2.5 flex items-center rounded-[inherit] text-sm leading-5 font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 transition-all duration-300" to="/user-profile-regular?tab=2">
                                <Icon className="text-lg leading-none w-7" name="shield-check" />
                                <span>Security Settings</span>
                            </Link>
                        </Menu.Item>
                    </li>
                    {/* Removed Login Activity - not needed for this implementation */}
                    {/* Removed Dark Mode - not needed for this implementation */}
                    <li className="block border-t border-gray-200 dark:border-gray-800 my-3"></li>
                    <li>
                        <Menu.Item as={Fragment}>
                            <button 
                                onClick={handleLogout}
                                className="w-full relative px-7 py-2.5 flex items-center rounded-[inherit] text-sm leading-5 font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 transition-all duration-300"
                            >
                                <Icon className="text-lg leading-none w-7" name="signout" />
                                <span>Sign out</span>
                            </button>
                        </Menu.Item>
                    </li>
                </ul>
            </Menu.Items>
            </>
        )}
    </Menu>
  )
}

export default UserDropdown