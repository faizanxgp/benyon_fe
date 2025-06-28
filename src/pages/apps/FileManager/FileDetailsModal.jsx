import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Avatar, Breadcrumb, Button, Icon } from '../../../componenets'
import { fileManagerIcons } from '../../../store/icons'

const FileDetailsModal = ({show, setShow, selectedItem}) => {

    // Helper function to format file size
    const formatFileSize = (bytes) => {
        // Check for null, undefined, or empty string, but allow 0
        if (bytes === null || bytes === undefined || bytes === '') return 'Unknown';
        
        const numBytes = Number(bytes);
        if (isNaN(numBytes)) return 'Unknown';
        
        if (numBytes === 0) return '0 B';
        if (numBytes < 1024) return `${numBytes} B`;
        if (numBytes < 1024 * 1024) return `${(numBytes / 1024).toFixed(1)} KB`;
        if (numBytes < 1024 * 1024 * 1024) return `${(numBytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(numBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch {
            return dateString;
        }
    };

    // Default to empty object if no item selected
    const item = selectedItem || {};
    
    // Debug: log what we received
    if (show) {
        console.log('FileDetailsModal opened with item:', item);
        console.log('Item size_bytes:', item.size_bytes);
        console.log('Item is_dir:', item.is_dir);
    }

  return (
    <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-[5000]" onClose={() => setShow(false)}>
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
                        <div className="flex flex-shrink-0 items-center justify-between px-5 sm:px-6 py-4 rounded-t-[inherit] border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center">
                                <div className="h-10 [&>svg]:h-full">
                                    {item.is_dir ? fileManagerIcons.folder : (item.icon || fileManagerIcons.fileDocAlt)}
                                </div>
                                <div className="ms-2">
                                    <div className="flex items-center text-sm font-medium mb-1"><span className="line-clamp-1">{item.name || 'Unknown'}</span></div>
                                    <div className="text-xs text-slate-400">{item.is_dir ? 'Folder' : 'File'}</div>
                                </div>
                            </div>
                            <button onClick={() => setShow(false)} className="text-slate-500 hover:text-slate-700 dark:text-white">
                                <Icon className="text-2xl" name="cross" />
                            </button>
                        </div>
                        <div className="px-5 sm:px-6 py-5 sm:py-6">
                            <div className="nk-file-details">
                                <div className="py-2 flex flex-wrap xs:flex-nowrap xs:py-1.5">
                                    <div className="text-sm/5 w-full xs:w-[100px] xs:flex-shrink-0 text-slate-400">Type</div>
                                    <div className="text-sm/5 text-slate-600 dark:text-slate-400">{item.is_dir ? 'Folder' : 'File'}</div>
                                </div>
                                <div className="py-2 flex flex-wrap xs:flex-nowrap xs:py-1.5">
                                    <div className="text-sm/5 w-full xs:w-[100px] xs:flex-shrink-0 text-slate-400">{item.is_dir ? 'Contents' : 'Size'}</div>
                                    <div className="text-sm/5 text-slate-600 dark:text-slate-400">
                                        {item.is_dir 
                                            ? `${item.num_files || 0} files, ${item.num_subdirs || 0} folders`
                                            : `${formatFileSize(item.size_bytes || item.size || 0)}`}
                                    </div>
                                </div>
                                {item.users && item.users.length > 0 && (
                                    <div className="py-2 flex flex-wrap xs:flex-nowrap xs:py-1.5">
                                        <div className="text-sm/5 w-full xs:w-[100px] xs:flex-shrink-0 text-slate-400">Shared with</div>
                                        <div className="text-sm/5 flex-shrink-0 text-slate-600">
                                            <Avatar.Group size="mb">
                                                {item.users.slice(0, 3).map((user, index) => (
                                                    user.image 
                                                        ? <Avatar key={index} size="mb" rounded img={user.image} />
                                                        : <Avatar key={index} variant="primary" size="mb" rounded text={user.name?.substring(0, 2) || 'U'} />
                                                ))}
                                                {item.users.length > 3 && <Avatar variant="slate" size="mb" rounded text={`+${item.users.length - 3}`} />}
                                            </Avatar.Group>
                                        </div>
                                    </div>
                                )}
                                <div className="py-2 flex flex-wrap xs:flex-nowrap xs:py-1.5">
                                    <div className="text-sm/5 w-full xs:w-[100px] xs:flex-shrink-0 text-slate-400">Modified</div>
                                    <div className="text-sm/5 text-slate-600 dark:text-slate-400">
                                        {formatDate(item.last_modified)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 sm:px-6 py-4 bg-gray-200 dark:bg-gray-900 rounded-b-[inherit]">
                            <div className="flex items-center justify-end flex-wrap gap-3">
                                <ul className="flex items-center gap-5">
                                    <li><Button size="rg" variant="light" className="bg-white">Share</Button></li>
                                    <li><Button onClick={() => setShow(false)} size="rg" variant="primary">Download</Button></li>
                                </ul>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default FileDetailsModal