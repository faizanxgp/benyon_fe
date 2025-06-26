import React, { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button, Icon, Progress } from '../../../componenets'
import { fileManagerIcons } from '../../../store/icons'
import { uploadMultipleFiles, uploadMultipleFilesDemo } from '../../../services/api'
import { buildDirectoryStructure, extractAllFiles, validateFiles, formatFileSize, getFileIcon } from '../../../utilities/fileUtils'

const UploadModal = ({show, setShow}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [directoryStructure, setDirectoryStructure] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Handle drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    console.log('Drop event triggered');
    console.log('DataTransfer:', e.dataTransfer);
    console.log('Files dropped:', e.dataTransfer.files);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log('Dropped files array:', droppedFiles);
    
    if (droppedFiles.length > 0) {
      addFilesToSelection(droppedFiles);
    } else {
      console.log('No files found in drop event');
    }
  };

  // Handle file selection (individual files only)
  const handleFileSelection = (event) => {
    console.log('File selection event triggered');
    console.log('Event target:', event.target);
    console.log('Files from event:', event.target.files);
    
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No files selected');
      return;
    }
    
    const files = extractAllFiles(event.target.files);
    console.log('Extracted files:', files);
    console.log('Files with details:', files.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      path: f.webkitRelativePath || 'root',
      lastModified: f.lastModified
    })));
    
    // Add to existing selection instead of replacing
    addFilesToSelection(files);
  };

  // Handle folder selection (folders with directory structure)
  const handleFolderSelection = (event) => {
    console.log('Folder selection event triggered');
    console.log('Event target:', event.target);
    console.log('Files from folder:', event.target.files);
    
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No folder selected');
      return;
    }
    
    const files = extractAllFiles(event.target.files);
    console.log('Extracted folder files:', files);
    console.log('Folder files with details:', files.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      path: f.webkitRelativePath || 'root',
      lastModified: f.lastModified
    })));
    
    // Get folder name from the first file's webkitRelativePath
    const folderName = files.length > 0 && files[0].webkitRelativePath 
      ? files[0].webkitRelativePath.split('/')[0] 
      : 'Unknown Folder';
    
    console.log(`Adding ${files.length} files from folder: ${folderName}`);
    console.log(`Current selection before adding: ${selectedFiles.length} files`);
    
    // Add to existing selection instead of replacing
    addFilesToSelection(files);
  };

  // Add files to existing selection (allows accumulating from multiple selections)
  const addFilesToSelection = (newFiles) => {
    console.log('Adding files to selection:', newFiles);
    
    if (!newFiles || newFiles.length === 0) {
      console.log('No new files to add');
      return;
    }
    
    // Combine with existing files, avoiding duplicates based on name and size
    const existingFiles = [...selectedFiles];
    const filesToAdd = [];
    
    newFiles.forEach(newFile => {
      const exists = existingFiles.some(existing => 
        existing.name === newFile.name && 
        existing.size === newFile.size &&
        (existing.webkitRelativePath || 'root') === (newFile.webkitRelativePath || 'root')
      );
      
      if (!exists) {
        filesToAdd.push(newFile);
      } else {
        console.log('Skipping duplicate file:', newFile.name);
      }
    });
    
    if (filesToAdd.length === 0) {
      console.log('No new files to add (all duplicates)');
      return;
    }
    
    const combinedFiles = [...existingFiles, ...filesToAdd];
    console.log('Combined files:', combinedFiles.length);
    
    processSelectedFiles(combinedFiles);
  };

  // Process selected files and build directory structure
  const processSelectedFiles = (files) => {
    console.log('Processing selected files:', files);
    
    if (!files || files.length === 0) {
      console.log('No files to process');
      return;
    }
    
    const validation = validateFiles(files, {
      maxFileSize: 100 * 1024 * 1024, // 100MB per file
      maxTotalSize: 1024 * 1024 * 1024, // 1GB total
    });

    if (!validation.isValid) {
      console.log('File validation failed:', validation.errors);
      setUploadErrors(validation.errors);
      return;
    }

    console.log('File validation passed');
    setUploadErrors([]);
    setSelectedFiles(files);
    
    // Build directory structure
    const structure = buildDirectoryStructure(files);
    setDirectoryStructure(structure);
    
    console.log('Directory Structure built:', structure);
    console.log('Selected files set:', files.length);
  };

  // Remove a specific file from selection
  const removeFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    
    if (updatedFiles.length === 0) {
      setDirectoryStructure({});
      setUploadProgress({});
    } else {
      const structure = buildDirectoryStructure(updatedFiles);
      setDirectoryStructure(structure);
    }
  };

  // Handle upload process
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadErrors(['Please select files to upload']);
      return;
    }

    setIsUploading(true);
    setUploadErrors([]);
    setUploadSuccess(false);

    try {
      console.log('Starting upload with files:', selectedFiles);
      console.log('Directory structure:', directoryStructure);

      // Initialize progress for all files
      const initialProgress = {};
      selectedFiles.forEach((file, index) => {
        initialProgress[index] = 0;
      });
      setUploadProgress(initialProgress);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const updated = {...prev};
          Object.keys(updated).forEach(key => {
            if (updated[key] < 90) {
              updated[key] += Math.random() * 15 + 5; // Faster progress simulation
            }
          });
          return updated;
        });
      }, 200);

      // Upload files with directory structure
      let response;
      try {
        response = await uploadMultipleFiles(selectedFiles, directoryStructure);
      } catch (apiError) {
        console.log('Real API failed, trying demo mode:', apiError.message);
        
        // If real API fails (e.g., server not running), use demo mode
        if (apiError.code === 'ECONNREFUSED' || apiError.message.includes('Network Error') || apiError.response?.status >= 500) {
          console.log('Using demo upload mode...');
          response = await uploadMultipleFilesDemo(selectedFiles, directoryStructure);
          
          // Add demo notice to success message
          setUploadErrors(['Demo mode: Files not actually uploaded. Backend server not available.']);
        } else {
          throw apiError; // Re-throw if it's not a connection issue
        }
      }
      
      clearInterval(progressInterval);
      
      // Mark all as 100% complete
      const completeProgress = {};
      selectedFiles.forEach((file, index) => {
        completeProgress[index] = 100;
      });
      setUploadProgress(completeProgress);
      
      setUploadSuccess(true);
      console.log('Upload successful:', response.data);
      
      // Auto-close modal after 3 seconds on success
      setTimeout(() => {
        handleModalClose();
      }, 3000);

    } catch (error) {
      console.error('Upload failed:', error);
      
      // Clear progress interval if it exists
      setUploadProgress({});
      
      // Provide more detailed error messages
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || 
                      `Server error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      } else {
        // Something else happened
        errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      setUploadErrors([errorMessage]);
    } finally {
      setIsUploading(false);
    }
  };

  // Test function to create a simple file for testing
  const handleTestUpload = () => {
    // Create a simple text file for testing
    const testContent = 'This is a test file for upload functionality';
    const testFile = new File([testContent], 'test-upload.txt', {
      type: 'text/plain',
      lastModified: Date.now()
    });
    
    console.log('Test file created:', testFile);
    addFilesToSelection([testFile]);
  };

  // Handle modal close and reset state
  const handleModalClose = () => {
    setSelectedFiles([]);
    setDirectoryStructure({});
    setUploadProgress({});
    setUploadErrors([]);
    setUploadSuccess(false);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
    setShow(false);
  };

  // Get file icon component
  const getFileIconComponent = (fileName) => {
    const iconName = getFileIcon(fileName);
    return fileManagerIcons[iconName] || fileManagerIcons.fileText || <Icon name="file" />;
  };

  return (
    <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-[5000]" onClose={handleModalClose}>
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
                    <Dialog.Panel className="relative bg-white dark:bg-gray-950 rounded-md w-full md:w-[800px] sm:w-[600px] mx-auto text-start max-h-[90vh] overflow-hidden">
                        <button onClick={handleModalClose} className="absolute top-3 end-3 text-slate-500 hover:text-slate-700 dark:text-white z-10">
                            <Icon className="text-xl" name="cross"></Icon>
                        </button>
                        
                        <div className="px-5 py-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                            <div className="mb-6">
                                <h5 className="text-xl font-bold font-heading text-slate-700 dark:text-white mb-4">
                                    Upload Files & Folders
                                </h5>
                                
                                {/* Upload Drop Zone */}
                                <div 
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors mb-6 ${
                                        isDragOver 
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <Icon className="text-4xl text-gray-400 mb-3 mx-auto" name="cloud-upload" />
                                    <h6 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Drag and drop files or folders here
                                    </h6>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        or use the buttons below to select files or folders<br/>
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                            💡 Click "Select Folders" multiple times to add different folders to your upload
                                        </span>
                                    </p>
                                    
                                    {/* Separate file inputs for files and folders */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        onChange={handleFileSelection}
                                        className="hidden"
                                        id="files-input"
                                    />
                                    
                                    <input
                                        ref={folderInputRef}
                                        type="file"
                                        webkitdirectory=""
                                        multiple
                                        onChange={handleFolderSelection}
                                        className="hidden"
                                        id="folder-input"
                                    />
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Button
                                            onClick={() => {
                                                // Clear the input and trigger file selection
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                            size="rg"
                                            variant="primary"
                                            className="cursor-pointer"
                                            title="Select multiple files at once using Ctrl+click or Shift+click"
                                        >
                                            <Icon className="mr-2" name="file-plus" />
                                            {selectedFiles.length > 0 ? 'Add More Files' : 'Select Files'}
                                        </Button>
                                        
                                        <Button
                                            onClick={() => {
                                                // Clear the input and trigger folder selection
                                                if (folderInputRef.current) {
                                                    folderInputRef.current.value = '';
                                                    folderInputRef.current.click();
                                                }
                                            }}
                                            size="rg"
                                            variant="outline"
                                            className="cursor-pointer"
                                            title="Select one folder at a time. Click multiple times to add more folders."
                                        >
                                            <Icon className="mr-2" name="folder-plus" />
                                            {selectedFiles.length > 0 ? 'Add More Folders' : 'Select Folders'}
                                        </Button>
                                        
                                        {selectedFiles.length > 0 && (
                                            <Button
                                                size="rg"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedFiles([]);
                                                    setDirectoryStructure({});
                                                    setUploadProgress({});
                                                    setUploadErrors([]);
                                                    setUploadSuccess(false);
                                                    console.log('Selection cleared');
                                                }}
                                                className="cursor-pointer text-red-600 border-red-300 hover:bg-red-50"
                                            >
                                                <Icon className="mr-2" name="trash" />
                                                Clear All
                                            </Button>
                                        )}
                                        
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handleTestUpload}
                                            className="cursor-pointer border-dashed"
                                        >
                                            <Icon className="mr-2" name="code" />
                                            Test Upload
                                        </Button>
                                    </div>
                                    
                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 text-center">
                                            <p className="text-sm text-blue-600 dark:text-blue-400">
                                                � Selected {selectedFiles.length} files from {Object.keys(directoryStructure).length || 1} location(s)
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Continue selecting to add more files/folders, or click Upload when ready
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Error Display */}
                                {uploadErrors.length > 0 && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                                        <div className="flex">
                                            <Icon className="text-red-500 text-lg mr-2" name="alert-circle-fill" />
                                            <div>
                                                <h6 className="text-red-800 dark:text-red-200 font-medium mb-1">Upload Errors</h6>
                                                <ul className="text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                                                    {uploadErrors.map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Success Display */}
                                {uploadSuccess && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                                        <div className="flex items-center">
                                            <Icon className="text-green-500 text-lg mr-2" name="check-circle-fill" />
                                            <span className="text-green-800 dark:text-green-200 font-medium">
                                                Files uploaded successfully!
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Selected Files List */}
                            {selectedFiles.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h6 className="font-heading font-bold text-base/tighter -tracking-snug text-slate-700 dark:text-white">
                                            Selected Files ({selectedFiles.length})
                                        </h6>
                                        <div className="text-sm text-slate-500">
                                            Total: {formatFileSize(selectedFiles.reduce((sum, file) => sum + file.size, 0))}
                                        </div>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto space-y-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center p-3 rounded border border-gray-200 dark:border-gray-800">
                                                <div className="flex-shrink-0 h-10 me-3 [&>svg]:h-full [&>svg]:w-10">
                                                    {getFileIconComponent(file.name)}
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium text-slate-600 dark:text-white truncate">
                                                            {file.webkitRelativePath || file.name}
                                                        </span>
                                                        {uploadProgress[index] !== undefined && (
                                                            <span className="text-xs text-slate-400 ml-2">
                                                                {Math.round(uploadProgress[index])}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-slate-400">
                                                        {formatFileSize(file.size)}
                                                    </div>
                                                    {uploadProgress[index] !== undefined && (
                                                        <Progress size="xs" className="bg-slate-100 dark:bg-slate-900 mt-1">
                                                            <Progress.Bar progress={`${uploadProgress[index]}%`}></Progress.Bar>
                                                        </Progress>
                                                    )}
                                                </div>
                                                {!isUploading && (
                                                    <button
                                                        onClick={() => removeFile(index)}
                                                        className="ml-2 text-slate-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <Icon className="text-lg" name="trash" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Directory Structure Preview */}
                                    {Object.keys(directoryStructure).length > 0 && (
                                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                            <p className="text-sm font-medium text-slate-700 dark:text-white mb-2">
                                                Directory Structure Preview:
                                            </p>
                                            <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-x-auto">
                                                {JSON.stringify(directoryStructure, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div className="text-sm text-slate-500">
                                    {selectedFiles.length > 0 && (
                                        <span>
                                            Total: {formatFileSize(selectedFiles.reduce((sum, file) => sum + file.size, 0))}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={handleModalClose} 
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-all duration-300"
                                        disabled={isUploading}
                                    >
                                        Cancel
                                    </button>
                                    <Button 
                                        size="rg" 
                                        variant="primary"
                                        onClick={handleUpload}
                                        disabled={selectedFiles.length === 0 || isUploading}
                                    >
                                        {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
                                    </Button>
                                </div>
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

export default UploadModal