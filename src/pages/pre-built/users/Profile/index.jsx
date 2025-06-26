import React, {useEffect, useState} from 'react'
import { Avatar, Button, Icon, Dropdown, Head } from '../../../../componenets';
import SimpleBar from 'simplebar-react';
import { Tab } from '@headlessui/react';
import Security from './Security';
import Activity from './Activity';
import Personal from './Personal';
import { useSearchParams } from "react-router-dom";
import { getUserName, getUserEmail } from '../../../../services/api';

const UserProfilePage = () => {
    const [pageAside, setPageAside] = useState(false);
    let [searchParams] = useSearchParams();
    const selectedTab = Number(searchParams.get('tab'))
    
    const [selectedIndex, setSelectedIndex] = useState()

    // User data state
    const [userName, setUserName] = useState(getUserName());
    const [userEmail, setUserEmail] = useState(getUserEmail());    useEffect(() => {
        setSelectedIndex(selectedTab);
    }, [selectedTab]);

    // Update user info when login/logout events occur
    useEffect(() => {
        const updateUserInfo = () => {
            setUserName(getUserName());
            setUserEmail(getUserEmail());
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

    useEffect(() => {
        const handleAside = () => {
            if (window.innerWidth > 1023) {
              setPageAside(false);
            }
        }
    
        handleAside();
        window.addEventListener('resize', handleAside);
        return () => {
         window.removeEventListener('resize', handleAside);
        };
    }, []);

  return (
    <>
        <Head title="Profile" />
        <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900 h-full">
            <Tab.Group as="div" className="relative flex" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <div id="pageAside" className={`peer min-w-[260px] max-w-[calc(100%-2.5rem)] w-[300px] 2xl:w-[380px] max-lg:min-h-screen bg-white dark:bg-gray-950 lg:bg-transparent border-e border-gray-300 dark:border-gray-900 flex-shrink-0 fixed lg:static top-0 start-0 z-[999] transition-transform duration-500 lg:transition-none -translate-x-full rtl:translate-x-full [&.active]:transform-none lg:transform-none lg:rtl:transform-none  ${pageAside ? "active" : ''}`}>
                    <SimpleBar className="max-lg:mt-16 max-lg:max-h-[calc(100vh-theme(spacing.16))]" >                        <div className="p-5 sm:p-6 border-b border-gray-300 dark:border-gray-900">
                            <div className="flex items-center">
                                <Avatar size="rg" variant="primary" rounded text={userName.split(' ').map(n => n[0]).join('').toUpperCase()} />
                                <div className="ms-4 flex flex-col">
                                    <span className="text-sm font-bold text-slate-700 dark:text-white">{userName}</span>
                                    <span className="text-xs text-slate-400 mt-1">{userEmail}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Tab.List as="ul" className="py-3 text-start">
                                <li>
                                    <Tab onClick={()=>{ setPageAside(false) }} className="group px-5 sm:px-6 py-3 sm:py-4 flex items-center text-sm font-medium leading-5 text-slate-600 hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300 w-full outline-none">
                                        <Icon className="text-lg w-8 text-start leading-5 opacity-80 text-slate-400 group-hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300" name="user-fill-c" />
                                        <span>Personal Infomation</span>
                                        <em className="text-base font-medium ms-auto leading-none rtl:-scale-x-100 -me-1 ni ni-chevron-right"></em>
                                    </Tab>                                </li>
                                <li>
                                    <Tab onClick={()=>{ setPageAside(false) }} className="group px-5 sm:px-6 py-3 sm:py-4 flex items-center text-sm font-medium leading-5 text-slate-600 hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300 w-full outline-none">
                                        <Icon className="text-lg w-8 text-start leading-5 opacity-80 text-slate-400 group-hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300" name="activity-round-fill" />
                                        <span>Account Activity</span>
                                        <em className="text-base font-medium ms-auto leading-none rtl:-scale-x-100 -me-1 ni ni-chevron-right"></em>
                                    </Tab>
                                </li><li>
                                    <Tab onClick={()=>{ setPageAside(false) }} className="group px-5 sm:px-6 py-3 sm:py-4 flex items-center text-sm font-medium leading-5 text-slate-600 hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300 w-full outline-none">
                                        <Icon className="text-lg w-8 text-start leading-5 opacity-80 text-slate-400 group-hover:text-primary-600 ui-selected:text-primary-600 transition-all duration-300" name="lock-alt-fill" />
                                        <span>Security Settings</span>
                                        <em className="text-base font-medium ms-auto leading-none rtl:-scale-x-100 -me-1 ni ni-chevron-right"></em>
                                    </Tab>
                                </li>
                            </Tab.List>
                        </div>
                    </SimpleBar>
                </div>
                <div onClick={()=>{ setPageAside(false) }} className="class-toggle fixed inset-0 bg-slate-950 bg-opacity-20 z-[900] opacity-0 invisible peer-[.active]:opacity-100 peer-[.active]:visible lg:!opacity-0 lg:!invisible"></div>
                <div className="flex-grow">                    <Tab.Panels className="tab-content p-5 sm:p-10">
                        <Tab.Panel>
                            <Personal pageAside={setPageAside} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Activity pageAside={setPageAside} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Security pageAside={setPageAside} />
                        </Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
    </>
  )
}

export default UserProfilePage