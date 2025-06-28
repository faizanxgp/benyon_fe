import { createUser, deleteUser, getUsersStatus, getUsername, replaceUserRole } from '../../../services/api';
// import { getUsersStatus } from '../../../services/api';
import React, { useEffect, useState, Fragment } from 'react';

// import React, {useState, Fragment} from 'react'
import {Avatar, Button, Icon, PageHead, Select, CheckBox, Form, Input, Pagination, Tooltip, Head} from "../../../componenets";
import { toInitials } from '../../../utilities';
// import { userData } from '../../../store/users';

import { Menu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useTheme } from "../../../layout/context";

// const ActionDropdown = ({className}) => {
    
//     const theme = useTheme();
//     let [dropdownToggle, setDropdownToggle] = useState()
//     let [dropdownContent, setDropdownContent] = useState()
//     let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
//         placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
//         modifiers: [
//             {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
//             {name: 'preventOverflow', options: { padding: 8 }},
//         ],
//     })
//   return (
//     <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
//         {({ open }) => (
//             <>
//                 <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
//                     <Button.Zoom size="sm">
//                         <Icon className="text-base/4.5" name="more-h" />
//                     </Button.Zoom>
//                 </Menu.Button>
//                 <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[180px]">
//                     <ul className="py-2">
//                         {/* <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="eye" />
//                                 <span>View Details</span>
//                             </Menu.Item>
//                         </li>
//                         <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="repeat" />
//                                 <span>Orders</span>
//                             </Menu.Item>
//                         </li>
//                         <li className="block border-t border-gray-300 dark:border-gray-900 my-2"></li>
//                         <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="shield-star" />
//                                 <span>Reset Pass</span>
//                             </Menu.Item>
//                         </li>
//                         <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="shield-off" />
//                                 <span>Reset 2FA</span>
//                             </Menu.Item>
//                         </li> */}
//                         {/* <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="na" />
//                                 <span>Suspend User</span>
//                             </Menu.Item>
//                         </li> */}
//                         <li>
//                             <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
//                                 <Icon className="text-start text-lg leading-none w-7 opacity-80" name="na" />
//                                 <span>Delete User</span>
//                             </Menu.Item>
//                         </li>
//                     </ul>
//                 </Menu.Items>
//             </>
//         )}
//     </Menu>
//   )
// }


const ActionDropdown = ({className, username, onDelete}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button.Zoom size="sm">
                        <Icon className="text-base/4.5" name="more-h" />
                    </Button.Zoom>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[180px]">
                    <ul className="py-2">
                        <li>
                            <Menu.Item as="button"
                                className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-red-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"
                                onClick={onDelete}
                            >
                                <Icon className="text-start text-lg leading-none w-7 opacity-80" name="na" />
                                <span>Delete User</span>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}


const FilterDropdown = ({className}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button.Zoom>
                        <Icon className="text-xl/4.5" name="filter-alt" />
                        <span className="absolute top-0.5 end-0.5 h-2 w-2 inline-block rounded-full bg-primary-600"></span>
                    </Button.Zoom>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[260px] xs:min-w-[360px]">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-800">
                        <span className="font-medium text-slate-700 dark:text-white">Filter Users</span>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-flow-dense grid-cols-12 gap-x-6 gap-y-4">
                            <div className="col-span-6">
                                <CheckBox size="sm" id="haveBalance">Have Balance</CheckBox>
                            </div>
                            <div className="col-span-6">
                                <CheckBox size="sm" id="KYCVerified">KYC Verified</CheckBox>
                            </div>
                            <div className="col-span-6">
                                <Form.Group>
                                    <Form.Label className="mb-3" htmlFor="userRole">Role </Form.Label>
                                    <Input.Wrap>
                                        <Select.Choice id="userRole">
                                            <Select.Option value="AnyRole">Any Role</Select.Option>
                                            <Select.Option value="Investor">Investor</Select.Option>
                                            <Select.Option value="Seller">Seller</Select.Option>
                                            <Select.Option value="Buyer">Buyer</Select.Option>
                                        </Select.Choice>
                                    </Input.Wrap>
                                </Form.Group>
                            </div>
                            <div className="col-span-6">
                                <Form.Group>
                                    <Form.Label className="mb-3" htmlFor="userStatus">Status</Form.Label>
                                    <Input.Wrap>
                                        <Select.Choice id="userStatus">
                                            <Select.Option value="AnyRole">Any Status</Select.Option>
                                            <Select.Option value="Active">Active</Select.Option>
                                            <Select.Option value="Pending">Pending</Select.Option>
                                            <Select.Option value="Suspend">Suspend</Select.Option>
                                            <Select.Option value="Deleted">Deleted</Select.Option>
                                        </Select.Choice>
                                    </Input.Wrap>
                                </Form.Group>
                            </div>
                            <div className="col-span-12">
                                <Menu.Item as={Fragment}>
                                    <Button size="rg" variant="secondary">Filter</Button>
                                </Menu.Item>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 dark:border-gray-800">
                        <a className="text-sm text-primary-500 hover:text-primary-700 transition-all duration-300" href="#link" onClick={(e)=> e.preventDefault()}>Reset Filter</a>
                        <a className="text-sm text-primary-500 hover:text-primary-700 transition-all duration-300" href="#link" onClick={(e)=> e.preventDefault()}>Save Filter</a>
                    </div>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}
const SettingsDropdown = ({className}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button.Zoom>
                        <Icon className="text-xl/4.5" name="setting" />
                    </Button.Zoom>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[120px]">
                    <ul className="py-2">
                        <li>
                            <h6 className="relative px-5 py-1.5 flex items-center text-xs leading-5 tracking-[1px] font-bold uppercase text-slate-700 dark:text-white">Show</h6>
                        </li>
                        <li className="group">
                            <Menu.Item as="button" className="w-full relative px-5 py-1.5 flex items-center rounded-[inherit] text-xs leading-5 font-normal text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <span>10 Items</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                        <li className="group active">
                            <Menu.Item as="button" className="w-full relative px-5 py-1.5 flex items-center rounded-[inherit] text-xs leading-5 font-normal text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <span>20 Items</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                        <li className="group">
                            <Menu.Item as="button" className="w-full relative px-5 py-1.5 flex items-center rounded-[inherit] text-xs leading-5 font-normal text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <span>30 Items</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                        <li className="block border-t border-gray-300 dark:border-gray-900 my-2"></li>
                        <li>
                            <h6 className="relative px-5 py-1.5 flex items-center text-xs leading-5 tracking-[1px] font-bold uppercase text-slate-700 dark:text-white">Order By</h6>
                        </li>
                        <li className="group active">
                            <Menu.Item as="button" className="w-full relative px-5 py-1.5 flex items-center rounded-[inherit] text-xs leading-5 font-normal text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <span>DESC</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                        <li className="group">
                            <Menu.Item as="button" className="w-full relative px-5 py-1.5 flex items-center rounded-[inherit] text-xs leading-5 font-normal text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <span>ASC</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}
const OptionsDropdown = ({className}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: [0, 4]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button size="xs" icon>
                        <Icon className="text-sm/4.5" name="plus" />
                    </Button>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[120px]">
                    <ul className="text-start py-2">
                        <li className="px-4 py-2">
                            <div className="flex items-center">
                                <CheckBox size="sm" id="checkBalance">Balance</CheckBox>
                            </div>
                        </li>
                        <li className="px-4 py-2">
                            <div className="flex items-center">
                                <CheckBox size="sm" id="checkPhone">Phone</CheckBox>
                            </div>
                        </li>
                        <li className="px-4 py-2">
                            <div className="flex items-center">
                                <CheckBox size="sm" id="checkVerified">Verified</CheckBox>
                            </div>
                        </li>
                        <li className="px-4 py-2">
                            <div className="flex items-center">
                                <CheckBox size="sm" id="checkStatus">Status</CheckBox>
                            </div>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}

const ChangeRoleDropdown = ({className, currentRole, username, onRoleChange}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })

    // Determine the alternative role
    const getAlternativeRole = (role) => {
        return role === 'admin' ? 'standard' : 'admin';
    };

    const alternativeRole = getAlternativeRole(currentRole);

    return (
        <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
            {({ open }) => (
                <>
                    <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                        <Tooltip placement="top" content="Change Role">
                            <Button.Zoom size="sm">
                                <Icon className="text-base/4.5" name="account-setting" />
                            </Button.Zoom>
                        </Tooltip>
                    </Menu.Button>
                    <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[180px]">
                        <ul className="py-2">
                            <li>
                                <Menu.Item as="button"
                                    className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"
                                    onClick={() => onRoleChange && onRoleChange(alternativeRole)}
                                >
                                    <Icon className="text-start text-lg leading-none w-7 opacity-80" name="account-setting" />
                                    <span>Change to {alternativeRole}</span>
                                </Menu.Item>
                            </li>
                        </ul>
                    </Menu.Items>
                </>
            )}
        </Menu>
    )
}

const UsersListCompactPage = () => {
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [showCardOptions, setShowCardOptions] = useState(false);    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createUserLoading, setCreateUserLoading] = useState(false);

    const [newUser, setNewUser] = useState({
        requiredActions: [],
        emailVerified: true,
        // username: "test_user3",
        email: "user@test3.com",
        firstName: "abc",
        lastName: "def",
        groups: [],
        attributes: { profile_pic_path: ["https://example.com/images/profile.jpg"] },
        role: "standard",
        enabled: true,
    });    const fetchUsers = () => {
        setLoading(true);
        setError(null); // Clear previous errors
        
        getUsersStatus()
            .then(res => {
                console.log('API Response:', res); // Debug log
                console.log('API Response data:', res.data); // Debug log
                
                if (!res.data || !res.data.detail) {
                    throw new Error('Invalid API response structure');
                }
                
                const detail = res.data.detail;
                console.log('Detail object:', detail); // Debug log
                
                const data = Object.entries(detail).map(([username, userObj], idx) => {
                    console.log(`Processing user ${username}:`, userObj); // Debug log
                    
                    // Check if userObj is an object with the expected properties
                    if (!userObj || typeof userObj !== 'object') {
                        console.warn(`Invalid data for user ${username}:`, userObj);
                        return null;
                    }
                    
                    // Handle the new API response format with object properties
                    const { full_name, email, role, session_status, enabled } = userObj;
                    
                    if (!full_name || !email || !role || session_status === undefined || enabled === undefined) {
                        console.warn(`Missing required fields for user ${username}:`, userObj);
                        return null;
                    }
                    
                    return {
                        id: idx,
                        username: username,
                        name: full_name,
                        email: email,
                        role: role,
                        status: session_status.charAt(0).toUpperCase() + session_status.slice(1), // "inactive" => "Inactive"
                        enabled: enabled
                    };
                }).filter(user => user !== null); // Remove any null entries
                
                console.log('Processed user data:', data); // Debug log
                setUsers(data);
            })
            .catch(err => {
                console.error('Error fetching users:', err); // Debug log
                console.error('Error details:', err.response); // Debug log
                setError('Failed to load users: ' + (err.message || 'Unknown error'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // useEffect(() => {
    // setLoading(true);
    // getUsersStatus()
    //     .then(res => {
    //     // Transform API response into an array of user objects
    //     const detail = res.data.detail;
    //     const data = Object.entries(detail).map(([name, arr], idx) => ({
    //         id: idx,
    //         name: name,
    //         email: arr[0],
    //         role: arr[1],
    //         status: arr[2].charAt(0).toUpperCase() + arr[2].slice(1), // "active" => "Active"
    //     }));
    //     setUsers(data);
    //     setLoading(false);
    //     })
    //     .catch(err => {
    //     setError('Failed to load users');
    //     setLoading(false);
    //     });
    // }, []);

    useEffect(() => {
    fetchUsers();
    }, []);

    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: [0,4]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <>
        <Head title="Users Lists" />
        <PageHead>
            <PageHead.Group>
                <PageHead.Title>User Management</PageHead.Title>
                {/* <PageHead.SubTitle>You have total 2,595 users.</PageHead.SubTitle> */}
            </PageHead.Group>
            <PageHead.Group>
                <PageHead.Option>
                    <ul className="flex items-center gap-4 px-3.5 py-5 sm:py-0">
                        <li>
                            <Button 
                                size="rg" 
                                variant="white-outline"
                                onClick={fetchUsers}
                            >
                                <Icon className="text-xl/4.5" name="reload" />
                                <span className="ms-3">Debug Refresh</span>
                            </Button>
                        </li>
                        {/* <li>
                            <Button size="rg" variant="white-outline">
                                <Icon className="text-xl/4.5" name="download-cloud" />
                                <span className="ms-3">Export</span>
                            </Button>
                        </li> */}
                        {/* <li className="ms-auto">
                            <Menu as="div" className="inline-flex relative">
                                {({ open }) => (
                                    <>
                                        <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                                            <Button size="rg" variant="primary" icon >
                                                <Icon className="text-xl/4.5" name="plus" />
                                            </Button>
                                        </Menu.Button>
                                        <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[180px]">
                                            <ul className="py-2">
                                                <li>
                                                    <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Add User</span></Menu.Item>
                                                </li>
                                                <li>
                                                    <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Add Team</span></Menu.Item>
                                                </li>
                                                <li>
                                                    <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Import User</span></Menu.Item>
                                                </li>
                                            </ul>
                                        </Menu.Items>
                                    </>
                                )}
                            </Menu>
                        </li> */}
                    </ul>
                </PageHead.Option>
            </PageHead.Group>
        </PageHead>
        <div className="border-y sm:border-x sm:rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900 h-full -mx-3.5 sm:m-0 relative">
            {loading && (
                <div className="absolute inset-0 bg-white dark:bg-gray-950 bg-opacity-90 flex items-center justify-center z-50">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Loading...</span>
                    </div>
                </div>
            )}
            <div className="p-4 relative">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                        <div className="relative w-[132px]">
                            {/* <Select.Choice placeholder="Bulk Action"> */}
                                {/* <Select.Option value="SendEmail">Send Email</Select.Option>
                                <Select.Option value="ChangeGroup">Change Group</Select.Option>
                                <Select.Option value="SuspendUser">Suspend User</Select.Option> */}
                                {/* <Select.Option value="DeleteUser">Delete User</Select.Option> */}
                            {/* </Select.Choice> */}
                        </div>
                        
                        {/* <Button size="rg" variant="light-pale-outline" className="hidden sm:inline-flex" disabled>Apply</Button> */}
                        {/* <Button size="rg" variant="light-pale-outline" className="sm:hidden" icon disabled><Icon className="text-xl leading-4.5 rtl:-scale-x-100" name="arrow-right" /></Button> */}
                    </div>
                    
                    <ul className="flex flex-wrap items-start gap-2.5">
                        {/* <li>
                            <Button.Zoom onClick={()=> setShowSearchForm(true)}>
                                <Icon className="text-xl/4.5" name="search" />
                            </Button.Zoom>
                        </li> */}
                        <li className="h-9 border-s border-gray-200 dark:border-gray-800"></li>
                        {/* <li>
                            <Button.Zoom onClick={()=> setShowCardOptions(true)} className="sm:hidden" size="rg">
                                <Icon className="text-xl text-slate-600 dark:text-slate-300 rtl:-scale-x-100" name="menu-right" />
                            </Button.Zoom>
                            <div className={`absolute sm:relative start-0 end-0 top-0 bottom-0 -m-5 p-5 sm:p-0 sm:m-0 bg-white dark:bg-gray-950 sm:bg-transparent sm:dark:bg-transparent shadow sm:shadow-none shadow-gray-200 dark:shadow-gray-900 opacity-0 invisible sm:opacity-100 sm:visible [&.active]:opacity-100 [&.active]:visible z-[700] ${showCardOptions ? "active" : ''}`}>
                                <ul className="flex items-center gap-x-1">
                                    <li className="me-auto sm:hidden -ms-2">
                                        <Button.Zoom  onClick={()=> setShowCardOptions(false)} size="rg">
                                            <Icon className="text-xl/4.5 rtl:-scale-x-100" name="arrow-left" />
                                        </Button.Zoom>
                                    </li>
                                    <li>
                                        <FilterDropdown />
                                    </li>
                                    <li>
                                        <SettingsDropdown />
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                    </ul>
                </div>
                <div className={`absolute inset-0 opacity-0 invisible [&.active]:opacity-100 [&.active]:visible z-[800] transition-all duration-300 bg-white dark:bg-gray-950 sm:rounded-t-md ${showSearchForm ? "active" : ''}`}>
                    <div className="p-5 flex items-center">
                        <button onClick={()=> setShowSearchForm(false)} className="relative inline-flex items-center justify-center text-center align-middle text-sm font-bold leading-4.5 rounded h-9 w-9 text-slate-600 transition-all duration-300">
                            <Icon className="text-xl/4.5 rtl:-scale-x-100" name="arrow-left" />
                        </button>
                        <input type="text" className="flex-grow block w-full box-border text-sm leading-4.5 px-2 py-1.5 h-9 text-slate-700 dark:text-white placeholder-slate-300 bg-white dark:bg-gray-950 border-0 shadow-none focus:outline-offset-0 focus:outline-0 focus:ring-0 focus:ring-offset-0 disabled:bg-slate-50 disabled:dark:bg-slate-950 disabled:cursor-not-allowed rounded transition-all" placeholder="Search by user or email" autoComplete="off" />
                        <button type="submit" className="relative inline-flex items-center justify-center text-center align-middle text-sm font-bold leading-4.5 rounded h-9 w-9 text-slate-600 hover:text-primary-600 transition-all duration-300">
                            <Icon className="text-xl/4.5" name="search" />
                        </button>
                    </div>
                </div>
            </div>
            {error && (
                <div className="p-4 text-center">
                    <div className="text-red-500 mb-2">{error}</div>
                    <button 
                        onClick={fetchUsers}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            )}
            
            {!loading && !error && users.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                    No users found. 
                    <button 
                        onClick={fetchUsers}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Refresh
                    </button>
                </div>
            )}
            
            {!loading && !error && users.length > 0 && (
                <div className="p-4 text-sm text-gray-600">
                    Showing {users.length} users
                </div>
            )}
            
            {!loading && !error && users.length > 0 && (
                <table className="border-collapse w-full border-gray-300 dark:border-gray-900"> 
                <thead>
                    <tr>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start w-10 sm:w-11">
                            <div className="flex items-center">
                                <CheckBox size="sm" id="uid-all" />
                            </div>
                        </th>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Full Name</span>
                        </th>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden lg:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Username</span>
                        </th>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden md:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Role</span>
                        </th>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden sm:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Email</span>
                        </th>
                        {/* <th className="py-2 px-2 first:ps-6 last:pe-6 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden md:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Phone</span>
                        </th>
                        <th className="py-2 px-2 first:ps-6 last:pe-6 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden 2xl:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Company</span>
                        </th>
                        <th className="py-2 px-2 first:ps-6 last:pe-6 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden lg:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Verified</span>
                        </th>
                        <th className="py-2 px-2 first:ps-6 last:pe-6 border-b border-t border-gray-300 dark:border-gray-900 text-start hidden 2xl:table-cell">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Last Login</span>
                        </th> */}                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-start">
                            <span className="block text-sm leading-relaxed text-slate-400 font-normal">Status</span>
                        </th>
                        <th className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-t border-gray-300 dark:border-gray-900 text-end min-w-[140px]">
                            <Button size="sm" variant="primary" onClick={() => setShowCreateUserDialog(true)} className="inline-flex items-center">
                                <Icon className="text-sm/4.5 me-2" name="plus" />
                                <span>Add User</span>
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {/* {userData.map((item, index) => { */}
                {users.map((item, index) => {
                    return(
                        <tr key={index} className="transition-all duration-300 hover:bg-gray-50 hover:dark:bg-gray-1000 group">
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900 w-10 sm:w-11">
                                <div className="flex items-center">
                                    <CheckBox size="sm" id={item.id} />
                                </div>
                            </td>
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900">
                                <div className="flex items-center">
                                    <span className="block text-xs font-medium leading-6 text-slate-700 dark:text-white">{item.name}</span>
                                </div>
                            </td>
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900 hidden lg:table-cell">
                                <span className="text-sm text-slate-400">{item.username}</span>
                            </td>
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900 hidden md:table-cell">
                                <span className="text-sm text-slate-400">{item.role}</span>
                            </td>
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900 hidden sm:table-cell">
                                <span className="text-sm text-slate-400">{item.email}</span>
                            </td>
                            {/* <td className="py-2 px-2 first:ps-6 last:pe-6 border-b border-gray-300 dark:border-gray-900 hidden md:table-cell">
                                <span className="text-sm text-slate-400">{item.phone}</span>
                            </td> */}
                            {/* <td className="py-2 px-2 first:ps-6 last:pe-6 border-b border-gray-300 dark:border-gray-900 hidden 2xl:table-cell">
                                <span className="text-sm text-slate-400">{item.country}</span>
                            </td> */}
                            {/* <td className="py-2 px-2 first:ps-6 last:pe-6 border-b border-gray-300 dark:border-gray-900 hidden lg:table-cell">
                                <div className="inline-flex items-center align-middle gap-2 text-slate-400 font-medium text-xs">
                                        {item.emailStatus === "success" && <Icon className="text-green-600" name="check-circle" />}
                                        {item.emailStatus === "alert" && <Icon name="alert-circle" />}
                                        {item.emailStatus === "warning" && <Icon className="text-yellow-600" name="alert-circle" />}
                                        {item.emailStatus === "pending" && <Icon className="text-cyan-600" name="alarm-alt" />}
                                        {item.emailStatus === "error" && <Icon className="text-red-600" name="alert-circle" />}
                                        <span>Email</span>
                                </div>
                            </td> */}
                            {/* <td className="py-2 px-2 first:ps-6 last:pe-6 border-b border-gray-300 dark:border-gray-900 hidden 2xl:table-cell">
                                <span className="text-sm text-slate-400">{item.lastLogin}</span>
                            </td> */}                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900">
                                {item.enabled === false && <span className="text-sm font-medium text-gray-500">Suspended</span>}
                                {item.enabled !== false && item.status === "Active" && <span className="text-sm font-medium text-green-600">Active</span>}
                                {item.enabled !== false && item.status === "Inactive" && <span className="text-sm font-medium text-cyan-600">Inactive</span>}
                                {item.enabled !== false && item.status === "Pending" && <span className="text-sm font-medium text-yellow-600">Pending</span>}
                                {item.enabled !== false && item.status === "Suspend" && <span className="text-sm font-medium text-red-600">Suspended</span>}
                            </td>
                            <td className="py-1.5 px-2 first:ps-4 last:pe-4 border-b border-gray-300 dark:border-gray-900 text-end min-w-[140px]">
                                <ul className="relative flex items-center justify-end -me-2">
                                    <li className="bg-gray-50 dark:bg-gray-1000 px-0.5">
                                        <Tooltip placement="top" content="Suspend">
                                            <Button.Zoom size="sm">
                                                <Icon className="text-base/4.5" name="user-cross-fill" />
                                            </Button.Zoom>
                                        </Tooltip>
                                    </li>
                                    <li className="bg-gray-50 dark:bg-gray-1000 px-0.5">
                                        <ChangeRoleDropdown
                                            currentRole={item.role}
                                            username={item.username}
                                            onRoleChange={async (newRole) => {
                                                if (window.confirm(`Are you sure you want to change role for ${item.name} from ${item.role} to ${newRole}?`)) {
                                                    try {
                                                        const response = await replaceUserRole({
                                                            username: item.username,
                                                            role: newRole
                                                        });
                                                        
                                                        // Check status code to confirm role change
                                                        if (response.status === 200) {
                                                            alert(`Role successfully changed from ${item.role} to ${newRole} for user ${item.name}`);
                                                            fetchUsers(); // Refresh the users list
                                                        } else {
                                                            alert(`Failed to change role. Status: ${response.status}`);
                                                        }
                                                    } catch (error) {
                                                        console.error('Error changing user role:', error);
                                                        alert(`Failed to change role: ${error.response?.data?.message || error.message}`);
                                                    }
                                                }
                                            }}
                                        />
                                    </li>
                                    {/* <li>
                                        <ActionDropdown />
                                    </li> */}

                                    <li>
                                        <ActionDropdown
                                            username={item.username}
                                            onDelete={async () => {
                                                if (window.confirm(`Are you sure you want to delete user "${item.name}"?`)) {
                                                    try {
                                                        await deleteUser({ username: item.username });
                                                        alert("User deleted!");
                                                        fetchUsers();
                                                    } catch (err) {
                                                        alert("Failed to delete user!");
                                                    }
                                                }
                                            }}
                                        />
                                    </li>

                                </ul>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            )}
            
            {/* <div className="p-5">
                <div className="flex flex-wrap justify-center sm:justify-between gap-4">
                    <Pagination>
                        <Pagination.Prev text="Prev"/>
                        <Pagination.Item>1</Pagination.Item>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Dot />
                        <Pagination.Item>6</Pagination.Item>
                        <Pagination.Item>7</Pagination.Item>
                        <Pagination.Next text="Next"/>
                    </Pagination>
                    <div className="flex items-center gap-x-4">
                        <div className="text-xs uppercase text-slate-600">Page</div>
                        <div className="relative w-16">
                            <Select.Choice>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                                <Select.Option value="3">3</Select.Option>
                            </Select.Choice>
                        </div>
                        <div className="text-xs uppercase text-slate-600">Of 102</div>
                    </div>
                </div>
            </div> */}
        </div>

        {showCreateUserDialog && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white dark:bg-gray-900 rounded shadow-lg p-8 w-full max-w-md relative">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                onClick={() => setShowCreateUserDialog(false)}
                aria-label="Close"
            >
                &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Create New User</h2>
            <form                onSubmit={async (e) => {
                    e.preventDefault();
                    setCreateUserLoading(true);
                    try {
                        const userToCreate = { ...newUser};
                        await createUser(userToCreate);
                        alert("User created!");
                        setShowCreateUserDialog(false);
                        fetchUsers();
                    } catch (err) {
                        alert("Failed to create user!");
                    } finally {
                        setCreateUserLoading(false);
                    }
                }}

            >
                {/* <div className="mb-3">
                    <label className="block mb-1">Username</label>
                    <input
                        name="username"
                        required
                        className="border rounded p-2 w-full"
                        value={newUser.username}
                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    />
                </div> */}
                <div className="mb-3">
                    <label className="block mb-1">Email</label>
                    {/* <input name="email" type="email" required className="border rounded p-2 w-full" /> */}
                    <input
                        name="email"
                        required
                        className="border rounded p-2 w-full"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                <label className="block mb-1">First Name</label>
                {/* <input name="firstName" required className="border rounded p-2 w-full" /> */}
                <input
                    name="firstName"
                    required
                    className="border rounded p-2 w-full"
                    value={newUser.firstName}
                    onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                </div>
                <div className="mb-3">
                <label className="block mb-1">Last Name</label>
                {/* <input name="lastName" required className="border rounded p-2 w-full" /> */}
                <input
                    name="lastName"
                    required
                    className="border rounded p-2 w-full"
                    value={newUser.lastName}
                    onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                />                </div>
                <div className="mb-3 hidden">
                <label className="block mb-1">Profile Pic URL</label>
                {/* <input name="profilePic" className="border rounded p-2 w-full" /> */}
                <input
                    name="profilePic"
                    required
                    className="border rounded p-2 w-full"
                    value={newUser.attributes.profile_pic_path[0]}
                    onChange={e => setNewUser({ ...newUser, attributes: { profile_pic_path: [e.target.value] } })}
                />
                </div>
                <div className="mb-3">
                <label className="block mb-1">Role</label>
                
                <select
                    name="role"
                    required
                    className="border rounded p-2 w-full"
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="" disabled>Select Role</option>
                    <option value="admin">admin</option>
                    <option value="standard">standard</option>
                </select>

                </div>                <button 
                    type="submit" 
                    disabled={createUserLoading}
                    className={`px-4 py-2 rounded text-white ${
                        createUserLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                    {createUserLoading ? "Creating..." : "Create"}
                </button>
            </form>
            </div>
        </div>
        )}

    </>
  )
}

export default UsersListCompactPage