import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button, Card, Icon, Switch, Input, Alert } from '../../../../componenets'
import { changePassword } from '../../../../services/api'

const Security = ({pageAside}) => {
    // State for password change modal
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Password validation function
    const validatePassword = (password) => {
        const errors = [];
        
        // Check minimum length (6 characters)
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        // Check for at least one capital letter
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one capital letter');
        }
        
        // Check for at least one number
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        return errors;
    };

    // Handle password change
    const handlePasswordChange = async () => {
        setError('');
        setSuccess('');
        
        // Validate new password
        const passwordErrors = validatePassword(newPassword);
        if (passwordErrors.length > 0) {
            setError(passwordErrors.join('. '));
            setNewPassword('');
            setConfirmPassword('');
            return;
        }
        
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }
        
        setIsLoading(true);
          try {
            // Call the API to update password
            const result = await changePassword(newPassword);
            
            setSuccess(result.message);
            setNewPassword('');
            setConfirmPassword('');
            
            // Close modal after success
            setTimeout(() => {
                setShowPasswordModal(false);
                setSuccess('');
            }, 2000);
            
        } catch (error) {
            setError(error.message || 'Failed to update password. Please try again.');
            setNewPassword('');
            setConfirmPassword('');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
    };
  return (
    <>
        <div className="flex justify-between items-center pb-6 sm:pb-10 gap-x-6">
            <div className="relative">
                <h5 className="text-2xl font-heading mb-2 font-bold leading-tighter tracking-tight text-slate-700 dark:text-white">Security Settings</h5>
                <p className="text-slate-600 dark:text-slate-400">These settings are helps you keep your account secure.</p>
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
        <Card>
            <Card.Body className="border-b last:border-b-0 border-gray-300 dark:border-gray-900">
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
                    <div>
                        <h6 className="text-base font-heading font-bold leading-tighter -tracking-snug text-slate-700 dark:text-white mb-2">Save my Activity Logs</h6>
                        <p className="text-slate-600 text-sm">You can save your all activity logs including unusual activity detected.</p>
                    </div>
                    <div>
                        <div className="flex">
                            <Switch id="checkUnusualActivity" defaultChecked />
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Body className="border-b last:border-b-0 border-gray-300 dark:border-gray-900">
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
                    <div>
                        <h6 className="text-base font-heading font-bold leading-tighter -tracking-snug text-slate-700 dark:text-white mb-2">Change Password</h6>
                        <p className="text-slate-600 text-sm">Set a unique password to protect your account.</p>
                    </div>                    <div>
                        <Button size="rg" variant="primary" onClick={() => setShowPasswordModal(true)}>Change Password</Button>
                    </div>
                </div>            </Card.Body>
        </Card>        {/* Password Change Modal */}
        <Transition appear show={showPasswordModal} as={Fragment}>
            <Dialog as="div" className="relative z-[5000]" onClose={handleCloseModal}>
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
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                                >
                                    Change Password
                                </Dialog.Title>
                                
                                <div className="space-y-4">
                                    {error && (
                                        <Alert variant="danger" className="mb-4">
                                            {error}
                                        </Alert>
                                    )}
                                    {success && (
                                        <Alert variant="success" className="mb-4">
                                            {success}
                                        </Alert>
                                    )}
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                                            New Password
                                        </label>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Password must be at least 6 characters with one capital letter and one number
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                                            Confirm Password
                                        </label>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleCloseModal}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        onClick={handlePasswordChange}
                                        disabled={isLoading || !newPassword || !confirmPassword}
                                    >
                                        {isLoading ? 'Updating...' : 'Update'}
                                    </Button>
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

export default Security