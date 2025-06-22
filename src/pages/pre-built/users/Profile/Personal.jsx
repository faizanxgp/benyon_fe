import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react'
import { Button, Form, Icon, Input, Select, Switch, Picker } from '../../../../componenets'
import { getUsername, retrieveUserDetails } from '../../../../services/api'

const Personal = ({pageAside}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch user details when component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true)
                const username = getUsername()
                
                if (!username) {
                    setError('No username found in token')
                    setLoading(false)
                    return
                }

                const response = await retrieveUserDetails(username)
                setUserDetails(response.data.detail)
                setError(null)
            } catch (err) {
                console.error('Error fetching user details:', err)
                setError('Failed to load user details')
                setUserDetails(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUserDetails()
    }, [])

    // Helper function to format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Not available'
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-slate-600 dark:text-slate-400">Loading user details...</div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-600 dark:text-red-400">Error: {error}</div>
            </div>
        )
    }
  return (
    <>
        <div className="flex justify-between items-center pb-6 sm:pb-10 gap-x-6">
            <div className="relative">
                <h5 className="text-2xl font-heading mb-2 font-bold leading-tighter tracking-tight text-slate-700 dark:text-white">Personal Information</h5>
                <p className="text-slate-600 dark:text-slate-400">Basic info, like your name and address, that you use on Nio Platform.</p>
            </div>
            <div className="lg:hidden">
                <Button.Zoom
                    onClick={()=>{
                        pageAside(true)
                    }}
                >
                    <Icon className="text-xl" name="menu-alt-r" />
                </Button.Zoom>
            </div>
        </div>

        {/* User Account Information */}
        <div className="mb-8 last:mb-0">
            <div className="py-2 px-5 bg-gray-100 dark:bg-gray-900 rounded">
                <h6 className="text-slate-400 whitespace-nowrap uppercase font-bold text-xxs tracking-relaxed leading-tight">Account Information</h6>
            </div>
            
            {/* Username */}
            <div className="modal-toggle group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800" onClick={() => setIsOpen(true)}>
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-slate-300 transition-all duration-300 block md:w-1/2">Username</span>
                    <span className="text-sm/6 text-slate-600 group-hover:text-slate-700 dark:text-white group-hover:dark:text-slate-200 transition-all duration-300 block md:w-1/2">{userDetails?.username || 'Not available'}</span>
                </div>
                <div className="md:flex md:items-center flex-grow-0 ms-auto md:justify-end md:w-[200px] md:text-end">
                    <span className="inline-flex items-center justify-center isolate relative h-8 w-8 px-1.5 before:content-[''] before:absolute before:-z-[1] before:h-5 before:w-5 group-hover:before:h-8 group-hover:before:w-8 before:rounded-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 before:-translate-x-1/2  before:-translate-y-1/2 before:top-1/2 before:left-1/2 before:bg-gray-200 before:dark:bg-gray-900 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-white">
                        <Icon className="text-base rtl:-scale-x-100" name="forward-ios" />
                    </span>
                </div>
            </div>
        </div>

        {/* Personal Details */}
        <div className="mb-8 last:mb-0">
            <div className="py-2 px-5 bg-gray-100 dark:bg-gray-900 rounded">
                <h6 className="text-slate-400 whitespace-nowrap uppercase font-bold text-xxs tracking-relaxed leading-tight">Personal Details</h6>
            </div>
            
            {/* First Name */}
            <div className="modal-toggle group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800" onClick={() => setIsOpen(true)}>
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-slate-300 transition-all duration-300 block md:w-1/2">First Name</span>
                    <span className="text-sm/6 text-slate-600 group-hover:text-slate-700 dark:text-white group-hover:dark:text-slate-200 transition-all duration-300 block md:w-1/2">{userDetails?.firstName || 'Not provided'}</span>
                </div>
                <div className="md:flex md:items-center flex-grow-0 ms-auto md:justify-end md:w-[200px] md:text-end">
                    <span className="inline-flex items-center justify-center isolate relative h-8 w-8 px-1.5 before:content-[''] before:absolute before:-z-[1] before:h-5 before:w-5 group-hover:before:h-8 group-hover:before:w-8 before:rounded-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 before:-translate-x-1/2  before:-translate-y-1/2 before:top-1/2 before:left-1/2 before:bg-gray-200 before:dark:bg-gray-900 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-white">
                        <Icon className="text-base rtl:-scale-x-100" name="forward-ios" />
                    </span>
                </div>
            </div>

            {/* Last Name */}
            <div className="modal-toggle group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800" onClick={() => setIsOpen(true)}>
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-slate-300 transition-all duration-300 block md:w-1/2">Last Name</span>
                    <span className="text-sm/6 text-slate-600 group-hover:text-slate-700 dark:text-white group-hover:dark:text-slate-200 transition-all duration-300 block md:w-1/2">{userDetails?.lastName || 'Not provided'}</span>
                </div>
                <div className="md:flex md:items-center flex-grow-0 ms-auto md:justify-end md:w-[200px] md:text-end">
                    <span className="inline-flex items-center justify-center isolate relative h-8 w-8 px-1.5 before:content-[''] before:absolute before:-z-[1] before:h-5 before:w-5 group-hover:before:h-8 group-hover:before:w-8 before:rounded-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 before:-translate-x-1/2  before:-translate-y-1/2 before:top-1/2 before:left-1/2 before:bg-gray-200 before:dark:bg-gray-900 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-white">
                        <Icon className="text-base rtl:-scale-x-100" name="forward-ios" />
                    </span>
                </div>
            </div>

            {/* Email */}
            <div className="group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800">
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 group-hover:text-slate-600 group-hover:dark:text-slate-300 transition-all duration-300 block md:w-1/2">Email</span>
                    <span className="text-sm/6 text-slate-600 dark:text-slate-300 block md:w-1/2">{userDetails?.email || 'Not available'}</span>
                </div>
            </div>
        </div>
        
        {/* Keep the existing modal for editing */}
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[5000]" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-700/50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 -translate-y-6"
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-6"
                    >
                        <Dialog.Panel className="relative bg-white dark:bg-gray-950 rounded-md w-full md:w-[720px] sm:w-[520px] mx-auto text-start">
                            <button onClick={() => setIsOpen(false)} className="modal-close *:pointer-events-none absolute top-4 end-4 text-slate-500 hover:text-slate-700 dark:text-white">
                                <Icon className="text-xl" name="cross" />
                            </button>
                            <div className="px-5 py-6 sm:p-15">
                                <Tab.Group>
                                    <h5 className="text-xl font-bold font-heading text-slate-700 dark:text-white">Update Profile</h5>
                                    <Tab.List as="ul" className="tab-nav flex flex-wrap font-heading text-sm border-b border-gray-300 dark:border-gray-900">
                                        <li className="tab-item pe-5 md:pe-6 lg:pe-7 xl:pe-9 last:pe-0">
                                            <Tab className="tab-toggle inline-flex items-center text-sm font-bold py-4 relative -mb-px text-slate-600 dark:text-slate-400 after:absolute after:h-0.75 after:bg-primary-600 after:inset-x-0 after:bottom-0 after:opacity-0 ui-selected:after:opacity-100 ui-selected:text-primary-600" data-target="#personal-info">Personal</Tab>
                                        </li>
                                        <li className="tab-item pe-5 md:pe-6 lg:pe-7 xl:pe-9 last:pe-0">
                                            <Tab className="tab-toggle inline-flex items-center text-sm font-bold py-4 relative -mb-px text-slate-600 dark:text-slate-400 after:absolute after:h-0.75 after:bg-primary-600 after:inset-x-0 after:bottom-0 after:opacity-0 ui-selected:after:opacity-100 ui-selected:text-primary-600" data-target="#personal-address">Address</Tab>
                                        </li>
                                    </Tab.List>
                                    <Tab.Panels className="tab-content mt-5">
                                        <Tab.Panel>
                                            <div className="grid grid-flow-dense grid-cols-12 gap-6">
                                                <div className="col-span-12 md:col-span-6">
                                                    <Form.Group>
                                                        <Form.Label className="mb-2" htmlFor="firstName">First Name</Form.Label>
                                                        <Input.Wrap>
                                                            <Input defaultValue={userDetails?.firstName || ''} id="firstName" />
                                                        </Input.Wrap>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-span-12 md:col-span-6">
                                                    <Form.Group>
                                                        <Form.Label className="mb-2" htmlFor="lastName">Last Name</Form.Label>
                                                        <Input.Wrap>
                                                            <Input defaultValue={userDetails?.lastName || ''} id="lastName" />
                                                        </Input.Wrap>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-span-12">
                                                    <Form.Group>
                                                        <Form.Label className="mb-2" htmlFor="email">Email Address</Form.Label>
                                                        <Input.Wrap>
                                                            <Input defaultValue={userDetails?.email || ''} id="email" />
                                                        </Input.Wrap>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="grid grid-flow-dense grid-cols-12 gap-6">
                                                <div className="col-span-12">
                                                    <Form.Group>
                                                        <Form.Label className="mb-2" htmlFor="address">Address</Form.Label>
                                                        <Input.Wrap>
                                                            <Input placeholder="Enter your address" id="address" />
                                                        </Input.Wrap>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                    <div className="flex justify-end gap-3 mt-6">
                                        <Button variant="light" onClick={() => setIsOpen(false)}>Cancel</Button>
                                        <Button variant="primary">Update Profile</Button>
                                    </div>
                                </Tab.Group>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default Personal