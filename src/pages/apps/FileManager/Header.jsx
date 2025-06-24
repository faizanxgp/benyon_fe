import React, {Fragment, useState, useRef, useEffect} from 'react'
import { Button, Icon } from '../../../componenets'
import { searchFiles } from '../../../services/api'

import { Menu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useTheme } from "../../../layout/context";

const Header = ({setShowUploadModal, userIsAdmin = false}) => {
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

    // Search functionality state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);

    // Handle Enter key press for search
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim().length > 0) {
            e.preventDefault();
            performSearch(searchQuery.trim());
        }
    };

    // Perform search API call
    const performSearch = async (query) => {
        setSearchLoading(true);
        try {
            const response = await searchFiles(query);
            setSearchResults(response.data.detail || []);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
            setShowSearchResults(false);
        } finally {
            setSearchLoading(false);
        }
    };

    // Handle click outside to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSearchResults(false);
                setSearchResults([]); // Clear the search results array
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle search result click
    const handleSearchResultClick = (filePath) => {
        console.log('Selected file:', filePath);
        setShowSearchResults(false);
        setSearchQuery('');
        // TODO: Navigate to file or show file details
    };
  return (
    <div className="hidden lg:flex items-center justify-between flex-wrap py-3 px-5 border-b border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-950 rounded-tr-md">
        <div className="flex items-center flex-grow relative" ref={searchContainerRef}>
            <Icon className="text-base/none text-slate-600" name="search"></Icon>
            <input 
                ref={searchInputRef}
                type="text" 
                className="block w-full box-border text-sm leading-4.5 px-2 py-2 h-9 text-slate-700 dark:text-white placeholder-slate-300 bg-white dark:bg-gray-950 border-0 shadow-none focus:outline-offset-0 focus:outline-0 focus:ring-0 focus:ring-offset-0 disabled:bg-slate-50 disabled:dark:bg-slate-950 disabled:cursor-not-allowed rounded transition-all" 
                placeholder="Search files, folders (Press Enter to search)" 
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // Clear results when query is cleared
                    if (e.target.value.trim().length === 0) {
                        setSearchResults([]);
                        setShowSearchResults(false);
                    }
                }}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => {
                    if (searchResults.length > 0) {
                        setShowSearchResults(true);
                    }
                }}
            />
            {searchLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                </div>
            )}
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-[1000] max-h-60 overflow-y-auto">
                    <ul className="py-1">
                        {searchResults.map((filePath, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleSearchResultClick(filePath)}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-900 transition-colors duration-200 flex items-center"
                                >
                                    <Icon 
                                        className="text-base/none text-slate-400 mr-3 flex-shrink-0" 
                                        name={filePath.includes('.') ? "file" : "folder"} 
                                    />
                                    <span className="truncate">{filePath}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* No Results Message */}
            {showSearchResults && searchResults.length === 0 && !searchLoading && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-[1000]">
                    <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                        No files found for "{searchQuery}"
                    </div>
                </div>
            )}
        </div>
        {userIsAdmin && (
            <ul className="flex items-center gap-4">
                <li>
                    <Menu as="div" className="inline-flex relative w-full">
                        {({ open }) => (
                            <>
                                <Menu.Button as='div' className={`inline-flex w-full ${open ? ' active' : ''}`} ref={setDropdownToggle}>
                                    <Button size="rg" variant='light'>
                                        <Icon className="text-xl/4.5" name="plus" /><span className="ms-3">Create</span>
                                    </Button>
                                </Menu.Button>
                                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[160px]">
                                    <ul className="py-2">
                                        <li>
                                            <Menu.Item as={Fragment}>
                                                <button onClick={() => setShowUploadModal(true)} className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300" >
                                                    <em className="text-lg/none text-start w-7 opacity-80 ni ni-upload-cloud"></em><span>Upload File</span>
                                                </button>
                                            </Menu.Item>
                                        </li>
                                        <li>
                                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                                <em className="text-lg/none text-start w-7 opacity-80 ni ni-file-plus"></em><span>Create File</span>
                                            </Menu.Item>
                                        </li>
                                        <li>
                                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                                <em className="text-lg/none text-start w-7 opacity-80 ni ni-folder-plus"></em><span>Create Folder</span>
                                            </Menu.Item>
                                        </li>
                                    </ul>
                                </Menu.Items>
                            </>
                        )}
                    </Menu>
                </li>
                <li>
                    <Button onClick={() => setShowUploadModal(true)} size="rg" variant="primary"><Icon className="text-xl/4.5" name="upload-cloud"></Icon> <span className="ms-3">Upload</span></Button>
                </li>
            </ul>
        )}
    </div>
  )
}

export default Header