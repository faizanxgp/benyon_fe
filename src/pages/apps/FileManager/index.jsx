import { getDirContents, isAdmin, getFilePreview, downloadFile, retrieveUserDetails, getUsername } from '../../../services/api';

import React,{useState, useEffect, Fragment} from 'react'
import Aside from './Aside';
import Header from './Header';
// import QuickAccess from './QuickAccess';
import { Button, Icon, CheckBox, Avatar, Head } from '../../../componenets';
import { fileManagerIcons } from '../../../store/icons'
import { toInitials } from '../../../utilities';
import UploadModal from './UploadModal';
import FileDetailsModal from './FileDetailsModal';
import FileCopyModal from './FileCopyModal';
import FileMoveModal from './FileMoveModal';
import FileShareModal from './FileShareMOdal';
import FilePreviewModal from './FilePreviewModal';
import PdfPreviewModal from './PdfPreviewModal';

import { Menu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useTheme } from "../../../layout/context";

const ItemActionDropdown = ({className, item, setShowDetailsModal, setSelectedItem, setShowShareModal, setShowCopyModal, setShowMoveModal, currentPath, setShowPreviewModal, setPreviewData, setPreviewFileName, setShowPdfPreviewModal, setPdfPreviewPath, setPdfPreviewFileName, onFileDownloaded}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        strategy: 'fixed', // Use fixed positioning to escape container constraints
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8, boundary: 'viewport' }},
            {name: 'flip', options: { fallbackPlacements: ['top-end', 'top-start', 'bottom-start', 'bottom-end'] }},
        ],
    })


    // Delete handler
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete '${item.name}'? This action cannot be undone.`)) return;
        try {
            const filePath = currentPath === "/" ? item.name : `${currentPath.slice(1)}/${item.name}`;
            const { deleteFileOrFolder } = await import('../../../services/api');
            await deleteFileOrFolder(filePath);
            // Reload the same directory path by updating the URL hash and reloading
            if (typeof window !== 'undefined') {
                const encodedPath = encodeURIComponent(currentPath);
                window.location.hash = `#path=${encodedPath}`;
                window.location.reload();
            }
        } catch (error) {
            alert('Failed to delete: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDownload = async () => {
        try {
            // Construct the full file path
            const filePath = currentPath === "/" ? item.name : `${currentPath.slice(1)}/${item.name}`;
            console.log('Downloading file at path:', filePath);
            
            const response = await downloadFile(filePath);
            console.log('Download response:', response);
            
            // Create a blob URL and trigger download
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = item.name; // Use the original filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Refresh recent files list after successful download
            if (onFileDownloaded) {
                onFileDownloaded();
            }
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file: ' + (error.response?.data?.message || error.message));
        }
    };

  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button.Zoom size="sm">
                        <Icon className="text-base/4.5" name="more-h" />
                    </Button.Zoom>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow-lg z-[9999] min-w-[150px] fixed"
                    onClick={(e) => e.stopPropagation()}>
                    <ul className="py-2">
                        {/* Only show Download option for files, not folders */}
                        {!item.is_dir && (
                            <li>
                                <Menu.Item as={Fragment}>
                                    <button onClick={handleDownload} className="relative px-5 py-2 flex items-center w-full rounded-[inherit] text-xs leading-5 text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300 outline-none">
                                        <Icon className="text-lg/none w-8 opacity-80 text-primary-600 text-start" name="download" />
                                        <span>Download</span>
                                    </button>
                                </Menu.Item>
                            </li>
                        )}
                        <li>
                            <Menu.Item as="button" className="relative px-5 py-2 flex items-center w-full rounded-[inherit] text-xs leading-5 text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300" onClick={handleDelete}>
                                <Icon className="text-lg/none w-8 opacity-80 text-primary-600 text-start" name="trash" />
                                <span>Delete</span>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}

const BulkActionDropdown = ({className, setShowShareModal, setShowCopyModal, setShowMoveModal}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        strategy: 'fixed', // Use fixed positioning to escape container constraints
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8, boundary: 'viewport' }},
            {name: 'flip', options: { fallbackPlacements: ['top-end', 'top-start', 'bottom-start', 'bottom-end'] }},
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
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow-lg z-[9999] min-w-[150px] fixed"
                    onClick={(e) => e.stopPropagation()}>
                    <ul className="py-2">
                        <li>
                            <Menu.Item as="button" className="relative px-5 py-2 flex items-center w-full rounded-[inherit] text-xs leading-5 text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:dark:text-primary-600 hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300">
                                <Icon className="text-lg/none w-8 opacity-80 text-primary-600 text-start" name="download" />
                                <span>Download</span>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}

const AddDropdown = ({className, setShowUploadModal}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        strategy: 'fixed', // Use fixed positioning to escape container constraints
        modifiers: [
            {name: 'offset', options: { offset: theme.direction === "rtl" ? [14, -8] : [-14, -8]}},
            {name: 'preventOverflow', options: { padding: 8, boundary: 'viewport' }},
            {name: 'flip', options: { fallbackPlacements: ['top-end', 'top-start', 'bottom-start', 'bottom-end'] }},
        ],
    })

  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <Button.Zoom size="rg">
                        <Icon className="text-xl/none text-slate-400 dark:text-slate-300" name="plus" />
                    </Button.Zoom>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow-lg z-[9999] min-w-[180px] fixed"
                    onClick={(e) => e.stopPropagation()}>
                    <ul className="py-2">
                        <li>
                            <Menu.Item as={Fragment}>
                                <button  onClick={() => setShowUploadModal(true)} className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                    <Icon className="text-start text-lg leading-none w-7 opacity-80" name="upload-cloud"></Icon><span>Upload File</span>
                                </button>
                            </Menu.Item>
                        </li>
                        <li>
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <Icon className="text-start text-lg leading-none w-7 opacity-80" name="file-plus"></Icon><span>Create File</span>
                            </Menu.Item>
                        </li>
                        <li>
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <Icon className="text-start text-lg leading-none w-7 opacity-80 " name="folder-plus"></Icon><span>Create Folder</span>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}



const OrderedDropdown = ({className, icon, textClassName}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-end" : "bottom-start",
        strategy: 'fixed', // Use fixed positioning to escape container constraints
        modifiers: [
            {name: 'offset', options: { offset: [0, 4]}},
            {name: 'preventOverflow', options: { padding: 8, boundary: 'viewport' }},
            {name: 'flip', options: { fallbackPlacements: ['top-end', 'top-start', 'bottom-start', 'bottom-end'] }},
        ],
    })

  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <button className="inline-flex items-center">
                        <span className="me-1 font-medium text-sm">Name</span>
                        <em className="text-base/4.5 ni ni-caret-down-fill"></em>
                    </button>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow-lg z-[9999] min-w-[150px] fixed"
                    onClick={(e) => e.stopPropagation()}>
                    <ul className="py-2">
                        <li className="group">
                            <h6 className="relative px-5 py-1.5 flex items-center text-xs leading-5 tracking-[1px] font-bold uppercase text-slate-700 dark:text-white">Ordered By</h6>
                        </li>
                        <li className="group active">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <span>Ascending</span>
                                <em className="hidden group-[.active]:block text-xs font-medium leading-none absolute top-1/2 end-4 -translate-y-1/2 ni ni-check-thick"></em>
                            </Menu.Item>
                        </li>
                        <li className="group">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <span>Descending</span>
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

const FileManagerPage = () => {
    const [pageAside, setPageAside] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [previewFileName, setPreviewFileName] = useState('');
    const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);
    const [pdfPreviewPath, setPdfPreviewPath] = useState('');
    const [pdfPreviewFileName, setPdfPreviewFileName] = useState('');

    const [currentPath, setCurrentPath] = useState("/");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [recentFiles, setRecentFiles] = useState([]);
    const [loadingRecent, setLoadingRecent] = useState(false);

    // const files = [
    //     {
    //         id:1,
    //         icon: fileManagerIcons.folderSecureAlt,
    //         name : "UI Design",
    //         date: "Today",
    //         time: "08:29 AM",
    //         size: "4.5 MB",
    //         stared: false,
    //         type: 'folder',
    //     },
    //     {
    //         id:2,
    //         icon: fileManagerIcons.folderAlt,
    //         name : "Proposal",
    //         date: "Today",
    //         time: "08:29 AM",
    //         size: "4.5 MB",
    //         stared: true,
    //         type: 'folder',
    //     },
    //     {
    //         id:3,
    //         icon: fileManagerIcons.folderSharedAlt,
    //         name : "Projects",
    //         date: "Yesterday",
    //         time: "08:29 AM",
    //         size: "35 MB",
    //         stared: false,
    //         type: 'folder',
    //         owner:{name:"Iliash Hossain"},
    //         users:[
    //             {name:"Iliash Hossain", theme:"purple"},
    //             {name:"Abu Bin Ishityak", theme:"pink"},
    //             {name:"Ricardo Salazar", image:"/images/avatar/b-sm.jpg"},
    //         ]
    //     },
    //     {
    //         id:4,
    //         icon: fileManagerIcons.folderAlt,
    //         name : "2022 Projects",
    //         date: "03 May",
    //         time: "08:29 AM",
    //         size: "1.2 GB",
    //         stared: false,
    //         type: 'folder',
    //     },
    //     {
    //         icon: fileManagerIcons.fileSheetAlt,
    //         name : "Update Data",
    //         ext: "xlsx",
    //         date: "Yesterday",
    //         time: "08:29 AM",
    //         size: "235 KB",
    //         stared: false,
    //         type: 'file',
    //         owner:{name:"Abu Bin Ishityak"},
    //         users:[
    //             {name:"Ricardo Salazar", image:"/images/avatar/b-sm.jpg"},
    //             {name:"Iliash Hossain", theme:"purple"},
    //             {name:"Abu Bin Ishityak", theme:"pink"},
    //             {name: "Mildred Delga", image: "/images/avatar/c-sm.jpg",},
    //             {name: "Larry Hughes", theme: "primary"},
    //         ]
    //     },
    //     {
    //         id:5,
    //         icon: fileManagerIcons.fileZipAlt,
    //         name : "DashWind v.1.2",
    //         ext: "zip",
    //         date: "03 May",
    //         time: "08:29 AM",
    //         size: "235 KB",
    //         stared: false,
    //         type: 'file',
    //     },
    //     {
    //         id:6,
    //         icon: fileManagerIcons.fileZipAlt,
    //         name : "covstats v1.0",
    //         ext: "zip",
    //         date: "01 May",
    //         time: "08:29 AM",
    //         size: "235 KB",
    //         stared: false,
    //         type: 'file',
    //     },
    //     {
    //         id:7,
    //         icon: fileManagerIcons.fileDocAlt,
    //         name : "Quotation",
    //         ext: "doc",
    //         date: "06 Apr",
    //         time: "08:29 AM",
    //         size: "23 MB",
    //         stared: false,
    //         type: 'file',
    //     },
    //     {
    //         id:8,
    //         icon: fileManagerIcons.fileDocAlt,
    //         name : "Work-to-do",
    //         ext: "txt",
    //         date: "02 Apr",
    //         time: "08:29 AM",
    //         size: "23 MB",
    //         stared: false,
    //         type: 'file',
    //     },
    //     {
    //         id:9,
    //         icon: fileManagerIcons.fileMediaAlt,
    //         name : "DashWind-Crypto-v1",
    //         ext: "psd",
    //         date: "02 Apr",
    //         time: "08:29 AM",
    //         size: "23 MB",
    //         stared: false,
    //         type: 'file',
    //     },
    // ]

    // useEffect(() => {
    //     const handleAside = () => {
    //         if (window.innerWidth > 1023) {
    //           setPageAside(false);
    //         }
    //     }
    
    //     handleAside();
    //     window.addEventListener('resize', handleAside);
    //     return () => {
    //      window.removeEventListener('resize', handleAside);
    //     };
    // }, []);

    // On mount, check for hash path and set currentPath
    useEffect(() => {
        if (window.location.hash.startsWith('#path=')) {
            const hashPath = decodeURIComponent(window.location.hash.replace('#path=', ''));
            if (hashPath && hashPath !== currentPath) {
                setCurrentPath(hashPath);
            }
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getDirContents(currentPath)
            .then((response) => {
            // The API returns { detail: [...] }
            setFiles(response.data.detail);
            })
            .catch((err) => {
            console.error("Failed to fetch directory contents", err);
            setFiles([]);
            })
            .finally(() => setLoading(false));
    }, [currentPath]);

    // Listen for refreshDirContents event to reload same directory after delete
    useEffect(() => {
        const handler = (e) => {
            if (e.detail && typeof e.detail.path === 'string') {
                setCurrentPath(e.detail.path);
            }
        };
        window.addEventListener('refreshDirContents', handler);
        return () => window.removeEventListener('refreshDirContents', handler);
    }, []);

    // Check admin status on component mount
    useEffect(() => {
        setUserIsAdmin(isAdmin());
    }, []);

    // Fetch recent files from user details
    const fetchRecentFiles = async () => {
        try {
            setLoadingRecent(true);
            // Get user's preferred_username from JWT token - this is used as username for the API
            const username = getUsername();
            
            if (!username) {
                console.warn('No username found in JWT token');
                setRecentFiles([]);
                return;
            }
            
            console.log('Fetching recent files for user:', username);
            const response = await retrieveUserDetails(username);
            
            console.log('API Response:', response.data); // Debug log
            
            if (response.data && response.data.detail && response.data.detail.attributes && response.data.detail.attributes.recent_files) {
                const recentFilesData = response.data.detail.attributes.recent_files
                    .map(fileString => {
                        try {
                            const [timestamp, filename] = fileString.split('|');
                            return {
                                timestamp,
                                filename,
                                displayTime: new Date(timestamp).toLocaleString()
                            };
                        } catch (error) {
                            console.warn('Error parsing recent file entry:', fileString);
                            return null;
                        }
                    })
                    .filter(Boolean) // Remove null entries
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
                
                setRecentFiles(recentFilesData);
            } else {
                setRecentFiles([]);
            }
        } catch (error) {
            console.error('Error fetching recent files:', error);
            setRecentFiles([]);
        } finally {
            setLoadingRecent(false);
        }
    };

    // Fetch recent files on component mount
    useEffect(() => {
        fetchRecentFiles();
    }, []);

  return (
    <>
        <Head title="File Manager" />
        <div className="border rounded-md bg-white dark:bg-gray-950 bg-opacity-40 border-gray-300 dark:border-gray-900 h-full">
            <div className="relative flex">
                <Aside  show={pageAside} setShow={setPageAside} />
                <div className="flex-grow">
                    <Header showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal} userIsAdmin={userIsAdmin} />
                    <div className="h-full max-h-full overflow-auto py-4.5 px-5 sm:py-5 lg:p-7">
                        <div className="pb-4">
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-heading font-bold text-2xl/tighter tracking-tight text-slate-700 dark:text-white">Document Management</h3>
                                </div>
                                <ul className="flex items-center gap-1.5 lg:hidden -me-1.5">
                                    <li>
                                        <Button.Zoom size="rg" onClick={()=> {
                                            setShowSearch(!showSearch);
                                        }}>
                                            <Icon className="text-xl/none text-slate-400 dark:text-slate-300" name="search"></Icon>
                                        </Button.Zoom>
                                    </li>
                                    {userIsAdmin && (
                                        <li>
                                            <AddDropdown setShowUploadModal={setShowUploadModal} />
                                        </li>
                                    )}
                                    <li>
                                        <Button.Zoom size="rg" onClick={()=> {
                                            setPageAside(!pageAside);
                                        }}>
                                            <Icon className="text-xl/none text-slate-400 dark:text-slate-300" name="menu-alt-r"></Icon>
                                        </Button.Zoom>
                                    </li>
                                </ul>
                                <div className={`absolute inset-x-0 -inset-y-0.5 opacity-0 bg-white dark:bg-gray-950 transition-all duration-300 rounded-md pointer-events-none px-3 lg:hidden [&.active]:opacity-100 [&.active]:pointer-events-auto [&.active]:z-10 ${showSearch ? 'active' : ''}`} id="search">
                                    <div className="relative w-full flex items-center">
                                        <button  onClick={(e)=> {
                                            setShowSearch(false);
                                        }} className="inline-flex items-center justify-center h-9 w-9 text-slate-600 hover:text-red-600">
                                            <Icon className="text-lg/none rtl:-scale-x-100" name="arrow-left" />
                                        </button>
                                        <input type="text" className="flex-grow block w-full box-border text-sm leading-4.5 px-2 py-2 h-9 text-slate-700 dark:text-white placeholder-slate-300 bg-white dark:bg-gray-950 border-0 shadow-none focus:outline-offset-0 focus:outline-0 focus:ring-0 focus:ring-offset-0 disabled:bg-slate-50 disabled:dark:bg-slate-950 disabled:cursor-not-allowed rounded transition-all" placeholder="Search files, folders" />
                                        <button className="inline-flex items-center justify-center h-9 w-9 text-slate-600 hover:text-primary-600">
                                            <Icon className="text-lg/none" name="search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Recent Files Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Icon className="text-base text-primary-600" name="clock" />
                                    <h4 className="font-medium text-lg text-slate-700 dark:text-white">Recent Downloads</h4>
                                </div>
                                <Button.Zoom 
                                    size="sm" 
                                    onClick={fetchRecentFiles}
                                    disabled={loadingRecent}
                                    title="Refresh recent files"
                                >
                                    <Icon className={`text-base text-slate-400 dark:text-slate-300 ${loadingRecent ? 'animate-spin' : ''}`} name="refresh" />
                                </Button.Zoom>
                            </div>
                            <div className="bg-slate-50 dark:bg-gray-900 rounded-lg p-4">
                                {loadingRecent ? (
                                    <div className="flex items-center justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Loading recent files...</span>
                                    </div>
                                ) : recentFiles.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                            {recentFiles.slice(0, 8).map((recentFile, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-950 rounded-md border border-gray-200 dark:border-gray-800 hover:shadow-sm transition-shadow duration-200"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <Icon className="text-lg text-primary-600" name="file-text" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <p className="text-sm font-medium text-slate-700 dark:text-white truncate">
                                                            {recentFile.filename}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            {recentFile.displayTime}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {recentFiles.length > 8 && (
                                            <div className="mt-3 text-center">
                                                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                                    View all recent files
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-6">
                                        <Icon className="text-3xl text-slate-300 dark:text-slate-600 mx-auto mb-2" name="file-text" />
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            No recent downloads yet. Download a file to see it here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Files Section Header */}
                        <div className="pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                {currentPath !== "/" && (
                                    <Button.Zoom 
                                        size="rg" 
                                        onClick={() => {
                                            const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
                                            setCurrentPath(parentPath);
                                        }}
                                        title="Go back to parent directory"
                                    >
                                        <Icon className="text-xl/none text-slate-400 dark:text-slate-300 rtl:scale-x-100" name="arrow-left" />
                                    </Button.Zoom>
                                )}
                                <h3 className="font-heading font-bold text-2xl/tighter tracking-tight text-slate-700 dark:text-white">Files</h3>
                            </div>
                        </div>
                        
                        {/* Directory Breadcrumb Navigation */}
                        <div className="mb-6">
                            <div className="flex items-center gap-1 text-sm">
                                <Icon className="text-base text-slate-400" name="folder" />
                                <button
                                    onClick={() => setCurrentPath("/")}
                                    className={`px-2 py-1 rounded transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-gray-800 ${
                                        currentPath === "/" 
                                            ? "text-primary-600 font-medium" 
                                            : "text-slate-600 dark:text-slate-300 hover:text-primary-600"
                                    }`}
                                >
                                    Root
                                </button>
                                {currentPath !== "/" && (
                                    <>
                                        {currentPath.split("/").filter(Boolean).map((folder, index, array) => {
                                            const pathUpToIndex = "/" + array.slice(0, index + 1).join("/");
                                            return (
                                                <div key={index} className="flex items-center gap-1">
                                                    <Icon className="text-xs text-slate-400" name="chevron-right" />
                                                    <button
                                                        onClick={() => setCurrentPath(pathUpToIndex)}
                                                        className={`px-2 py-1 rounded transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-gray-800 ${
                                                            index === array.length - 1 
                                                                ? "text-primary-600 font-medium" 
                                                                : "text-slate-600 dark:text-slate-300 hover:text-primary-600"
                                                        }`}
                                                    >
                                                        {folder}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* QuickAccess section commented out */}
                        {/* <div className="mb-10 last:mb-0">
                            <QuickAccess />
                        </div> */}
                        
                        <div className="mb-10 last:mb-0">
                            <div className="grid grid-flow-dense grid-cols-12 gap-4">
                                {files.map((item, index) => (
                                <div
                                    key={index}
                                    className="group/fileitem relative border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-950 rounded col-span-12 xs:col-span-6 sm:col-span-4 xl:col-span-3 2xl:col-span-2"
                                >
                                    <a
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault();
                                        // If it's a folder, navigate into it
                                        if (item.is_dir) {
                                            // Avoid double slashes
                                            setCurrentPath(currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`);
                                        } else if (item.name.toLowerCase().endsWith('.pdf')) {
                                            // If it's a PDF file, open PDF preview
                                            const filePath = currentPath === "/" ? item.name : `${currentPath.slice(1)}/${item.name}`;
                                            setPdfPreviewPath(filePath);
                                            setPdfPreviewFileName(item.name);
                                            setShowPdfPreviewModal(true);
                                        }
                                    }}
                                    className="flex flex-col pt-6 pb-4"
                                    style={{ cursor: item.is_dir || item.name.toLowerCase().endsWith('.pdf') ? "pointer" : "default" }}
                                    title={item.is_dir ? "Open folder" : (item.name.toLowerCase().endsWith('.pdf') ? "Preview PDF" : item.name)}
                                    >
                                    <div className="h-18 [&>svg]:h-full [&>svg]:mx-auto">
                                        {item.is_dir 
                                            ? fileManagerIcons.folderAlt 
                                            : item.name.toLowerCase().endsWith('.pdf')
                                                ? fileManagerIcons.filePDFAlt
                                                : fileManagerIcons.fileDocAlt
                                        }
                                    </div>
                                    <div className="text-sm/snug text-center font-medium pt-4 flex justify-center">
                                        <span className="line-clamp-1">{item.name}</span>
                                    </div>
                                    </a>
                                    <div className="absolute top-2 end-2 transition-all duration-300 group-hover/fileitem:opacity-100">
                                    <ItemActionDropdown
                                        item={item}
                                        currentPath={currentPath}
                                        setShowDetailsModal={setShowDetailsModal}
                                        setSelectedItem={setSelectedItem}
                                        setShowShareModal={setShowShareModal}
                                        setShowCopyModal={setShowCopyModal}
                                        setShowMoveModal={setShowMoveModal}
                                        setShowPreviewModal={setShowPreviewModal}
                                        setPreviewData={setPreviewData}
                                        setPreviewFileName={setPreviewFileName}
                                        setShowPdfPreviewModal={setShowPdfPreviewModal}
                                        setPdfPreviewPath={setPdfPreviewPath}
                                        setPdfPreviewFileName={setPdfPreviewFileName}
                                        onFileDownloaded={fetchRecentFiles}
                                    />
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UploadModal show={showUploadModal} setShow={setShowUploadModal} />
        <FileDetailsModal show={showDetailsModal} setShow={setShowDetailsModal} selectedItem={selectedItem} />
        <FileCopyModal show={showCopyModal} setShow={setShowCopyModal} />
        <FileMoveModal show={showMoveModal} setShow={setShowMoveModal} />
        <FileShareModal show={showShareModal} setShow={setShowShareModal} />
        <FilePreviewModal show={showPreviewModal} setShow={setShowPreviewModal} previewData={previewData} fileName={previewFileName} />
        <PdfPreviewModal show={showPdfPreviewModal} setShow={setShowPdfPreviewModal} filePath={pdfPreviewPath} fileName={pdfPreviewFileName} />

    </>
  )
}

export default FileManagerPage