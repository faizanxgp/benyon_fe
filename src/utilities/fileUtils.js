/**
 * Utility functions for handling file and directory operations
 */

/**
 * Builds a directory structure object from a list of files
 * @param {File[]} files - Array of File objects with webkitRelativePath
 * @returns {Object} Directory structure object
 */
export const buildDirectoryStructure = (files) => {
  const structure = {
    folders: {},
    files: []
  };

  files.forEach(file => {
    const path = file.webkitRelativePath || file.name;
    const pathParts = path.split('/');
    
    if (pathParts.length === 1) {
      // Root level file
      structure.files.push(file.name);
    } else {
      // File in a folder structure
      let currentLevel = structure.folders;
      
      // Navigate/create folder structure
      for (let i = 0; i < pathParts.length - 1; i++) {
        const folderName = pathParts[i];
        
        if (!currentLevel[folderName]) {
          currentLevel[folderName] = {
            folders: {},
            files: []
          };
        }
        currentLevel = currentLevel[folderName].folders;
      }
      
      // Add file to the final folder
      const fileName = pathParts[pathParts.length - 1];
      const parentFolder = pathParts[pathParts.length - 2];
      
      // Navigate back to the parent folder to add the file
      let parentLevel = structure.folders;
      for (let i = 0; i < pathParts.length - 2; i++) {
        parentLevel = parentLevel[pathParts[i]].folders;
      }
      
      if (!parentLevel[parentFolder]) {
        parentLevel[parentFolder] = {
          folders: {},
          files: []
        };
      }
      
      parentLevel[parentFolder].files.push(fileName);
    }
  });

  return structure;
};

/**
 * Extracts all files from FileList, including files from folders
 * @param {FileList} fileList - FileList object from input element
 * @returns {File[]} Array of File objects
 */
export const extractAllFiles = (fileList) => {
  console.log('extractAllFiles called with:', fileList);
  console.log('FileList length:', fileList ? fileList.length : 'null/undefined');
  
  if (!fileList) {
    console.log('FileList is null or undefined');
    return [];
  }
  
  const filesArray = Array.from(fileList);
  console.log('Converted to array:', filesArray);
  console.log('Array length:', filesArray.length);
  
  return filesArray;
};

/**
 * Validates file types and sizes
 * @param {File[]} files - Array of files to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFiles = (files, options = {}) => {
  const {
    maxFileSize = 100 * 1024 * 1024, // 100MB default
    allowedTypes = [], // Empty array means all types allowed
    maxTotalSize = 1024 * 1024 * 1024 // 1GB default
  } = options;

  const errors = [];
  let totalSize = 0;

  files.forEach((file, index) => {
    // Check file size
    if (file.size > maxFileSize) {
      errors.push(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxFileSize)}`);
    }

    // Check file type
    if (allowedTypes.length > 0) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const mimeType = file.type;
      
      const isAllowed = allowedTypes.some(type => {
        return fileExtension === type.toLowerCase() || 
               mimeType.includes(type) ||
               file.name.toLowerCase().endsWith(`.${type.toLowerCase()}`);
      });

      if (!isAllowed) {
        errors.push(`File "${file.name}" type is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      }
    }

    totalSize += file.size;
  });

  // Check total size
  if (totalSize > maxTotalSize) {
    errors.push(`Total upload size exceeds maximum of ${formatFileSize(maxTotalSize)}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    totalSize,
    fileCount: files.length
  };
};

/**
 * Formats file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets file icon based on file extension
 * @param {string} fileName - Name of the file
 * @returns {string} Icon name that matches the fileManagerIcons store
 */
export const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  
  const iconMap = {
    // Documents
    'pdf': 'filePDF',
    'doc': 'fileDoc',
    'docx': 'fileDoc',
    'txt': 'fileText',
    'rtf': 'fileText',
    
    // Spreadsheets
    'xls': 'fileSheet',
    'xlsx': 'fileSheet',
    'csv': 'fileSheet',
    
    // Presentations
    'ppt': 'filePPT',
    'pptx': 'filePPT',
    
    // Images/Media
    'jpg': 'fileMedia',
    'jpeg': 'fileMedia',
    'png': 'fileMedia',
    'gif': 'fileMedia',
    'bmp': 'fileMedia',
    'svg': 'fileMedia',
    'webp': 'fileMedia',
    
    // Videos
    'mp4': 'fileMovie',
    'avi': 'fileMovie',
    'mov': 'fileMovie',
    'wmv': 'fileMovie',
    'flv': 'fileMovie',
    'webm': 'fileMovie',
    
    // Audio
    'mp3': 'fileMusic',
    'wav': 'fileMusic',
    'flac': 'fileMusic',
    'aac': 'fileMusic',
    'ogg': 'fileMusic',
    
    // Archives
    'zip': 'fileZip',
    'rar': 'fileZip',
    '7z': 'fileZip',
    'tar': 'fileZip',
    'gz': 'fileZip',
    
    // Code
    'js': 'fileCode',
    'jsx': 'fileCode',
    'ts': 'fileCode',
    'tsx': 'fileCode',
    'html': 'fileCode',
    'css': 'fileCode',
    'php': 'fileCode',
    'py': 'fileCode',
    'java': 'fileCode',
    'cpp': 'fileCode',
    'c': 'fileCode',
    'json': 'fileCode',
    'xml': 'fileCode',
  };
  
  return iconMap[extension] || 'fileText';
};
