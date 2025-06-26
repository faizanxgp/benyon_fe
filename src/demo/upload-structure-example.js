// Demo of the directory structure that gets sent to your API endpoint
// This is what the "directory_structure" field contains when uploaded

const exampleUploadData = {
  // This is the structure sent in the form-data field "directory_structure"
  directoryStructure: {
    "folders": {
      "documents": {
        "folders": {
          "pdfs": {
            "files": ["doc1.pdf", "doc2.pdf"],
            "folders": {}
          },
          "images": {
            "files": ["img1.jpg", "img2.png"],
            "folders": {}
          }
        },
        "files": ["readme.txt"]
      },
      "media": {
        "files": ["video1.mp4", "audio1.mp3"],
        "folders": {}
      }
    },
    "files": ["root_file.txt"]
  },
  
  // These are the actual files sent in the form-data as "files" field
  files: [
    // File objects with properties like:
    // - name: "doc1.pdf"
    // - size: 1024000
    // - type: "application/pdf" 
    // - webkitRelativePath: "documents/pdfs/doc1.pdf"
  ]
};

// Backend API Call Structure:
// POST /files/upload_multiple
// Content-Type: multipart/form-data
// Authorization: Bearer {your_jwt_token}
//
// Form Data Fields:
// - files: [multiple File objects]
// - directory_structure: JSON.stringify(directoryStructure)

console.log('Example directory structure JSON:', 
  JSON.stringify(exampleUploadData.directoryStructure, null, 2)
);
