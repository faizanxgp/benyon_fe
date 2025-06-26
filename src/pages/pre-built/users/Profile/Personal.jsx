import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button, Form, Icon, Input, Select, Switch, Picker, Alert } from '../../../../componenets'
import { getUsername, retrieveUserDetails, updateUserProfile } from '../../../../services/api'

const Personal = ({pageAside}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: ''
    })
    const [updateLoading, setUpdateLoading] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateError, setUpdateError] = useState('')

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
                }                const response = await retrieveUserDetails(username)
                setUserDetails(response.data.detail)
                // Populate form data
                setFormData({
                    firstName: response.data.detail?.firstName || '',
                    lastName: response.data.detail?.lastName || '',
                    address: response.data.detail?.address || ''
                })
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
    }, [])    // Helper function to format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Not available'
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        // Clear any previous error when user starts typing
        if (updateError) {
            setUpdateError('')
        }
    }    // Handle profile update
    const handleUpdateProfile = async () => {
        try {
            setUpdateLoading(true)
            setUpdateError('')
            
            const username = getUsername()
            if (!username) {
                setUpdateError('Username not found')
                return
            }

            // Prepare update data
            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                address: formData.address.trim()
            }

            // Make API call to update profile
            await updateUserProfile(username, updateData)
            
            // Update local state
            setUserDetails(prev => ({
                ...prev,
                ...updateData
            }))
            
            setUpdateSuccess(true)
            
            // Close modal after 2 seconds
            setTimeout(() => {
                setUpdateSuccess(false)
                setIsOpen(false)
            }, 2000)
            
        } catch (err) {
            console.error('Error updating profile:', err)
            setUpdateError(err.message || 'Failed to update profile. Please try again.')
        } finally {
            setUpdateLoading(false)
        }
    }

    // Reset form when modal opens
    const openModal = () => {
        setFormData({
            firstName: userDetails?.firstName || '',
            lastName: userDetails?.lastName || '',
            address: userDetails?.address || ''
        })
        setUpdateError('')
        setUpdateSuccess(false)
        setIsOpen(true)
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
                </Button.Zoom>            </div>
        </div>        {/* User Information */}
        <div className="mb-8 last:mb-0">
            {/* Username */}
            <div className="group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800">
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 block md:w-1/2">Username</span>
                    <span className="text-sm/6 text-slate-600 dark:text-white block md:w-1/2">{userDetails?.username || 'Not available'}</span>
                </div>
            </div>

            {/* First Name */}
            <div className="group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800">
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 block md:w-1/2">First Name</span>
                    <span className="text-sm/6 text-slate-600 dark:text-white block md:w-1/2">{userDetails?.firstName || 'Not provided'}</span>
                </div>
            </div>

            {/* Last Name */}
            <div className="group px-5 py-4 md:py-6 flex items-center border-b last:border-b-0 border-gray-200 dark:border-gray-800">
                <div className="md:flex md:items-center flex-grow">
                    <span className="text-sm/6 text-slate-400 block md:w-1/2">Last Name</span>
                    <span className="text-sm/6 text-slate-600 dark:text-white block md:w-1/2">{userDetails?.lastName || 'Not provided'}</span>
                </div>
            </div>
        </div>        {/* Update Button */}
        <div className="flex justify-end mt-6">
            <Button variant="primary" onClick={openModal}>Update Profile</Button>
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
                            </button>                            <div className="px-5 py-6 sm:p-15">
                                <h5 className="text-xl font-bold font-heading text-slate-700 dark:text-white mb-5">Update Profile</h5>
                                
                                {/* Success Message */}
                                {updateSuccess && (
                                    <Alert variant="success" className="mb-6">
                                        <Icon name="check-circle" className="me-2" />
                                        Profile updated successfully!
                                    </Alert>
                                )}
                                
                                {/* Error Message */}
                                {updateError && (
                                    <Alert variant="danger" className="mb-6">
                                        <Icon name="alert-circle" className="me-2" />
                                        {updateError}
                                    </Alert>
                                )}
                                
                                <div className="grid grid-flow-dense grid-cols-12 gap-6">
                                    <div className="col-span-12 md:col-span-6">
                                        <Form.Group>
                                            <Form.Label className="mb-2" htmlFor="firstName">First Name</Form.Label>
                                            <Input.Wrap>
                                                <Input 
                                                    value={formData.firstName} 
                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    id="firstName" 
                                                    disabled={updateLoading || updateSuccess}
                                                />
                                            </Input.Wrap>
                                        </Form.Group>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <Form.Group>
                                            <Form.Label className="mb-2" htmlFor="lastName">Last Name</Form.Label>
                                            <Input.Wrap>
                                                <Input 
                                                    value={formData.lastName} 
                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    id="lastName" 
                                                    disabled={updateLoading || updateSuccess}
                                                />
                                            </Input.Wrap>
                                        </Form.Group>
                                    </div>
                                    <div className="col-span-12">
                                        <Form.Group>
                                            <Form.Label className="mb-2" htmlFor="address">Address</Form.Label>
                                            <Input.Wrap>
                                                <Input 
                                                    value={formData.address} 
                                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                                    placeholder="Enter your address" 
                                                    id="address" 
                                                    disabled={updateLoading || updateSuccess}
                                                />
                                            </Input.Wrap>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <Button 
                                        variant="light" 
                                        onClick={() => setIsOpen(false)}
                                        disabled={updateLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        onClick={handleUpdateProfile}
                                        disabled={updateLoading || updateSuccess}
                                        loading={updateLoading}
                                    >
                                        {updateLoading ? 'Updating...' : 'Update Profile'}
                                    </Button>
                                </div>
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