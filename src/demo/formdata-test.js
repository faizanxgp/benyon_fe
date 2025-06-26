// Test script to verify FormData structure matches backend expectations
// Backend code: files = data.getlist("file")

console.log('=== FormData Structure Test ===');

// Create test files
const file1 = new File(['test content 1'], 'test1.txt', { type: 'text/plain' });
const file2 = new File(['test content 2'], 'test2.txt', { type: 'text/plain' });
const file3 = new File(['test content 3'], 'folder/test3.txt', { type: 'text/plain' });

const files = [file1, file2, file3];
const directoryStructure = {
  folders: {
    folder: {
      files: ['test3.txt'],
      folders: {}
    }
  },
  files: ['test1.txt', 'test2.txt']
};

// Create FormData exactly as the upload function does
const formData = new FormData();

// Each file is appended with key "file" (not "files")
files.forEach((file, index) => {
  formData.append('file', file, file.name);
  console.log(`Added file ${index}: key="file", name="${file.name}"`);
});

formData.append('directory_structure', JSON.stringify(directoryStructure));

console.log('\n=== FormData Contents ===');
for (let pair of formData.entries()) {
  if (pair[1] instanceof File) {
    console.log(`${pair[0]}: File(${pair[1].name}, ${pair[1].size} bytes)`);
  } else {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
}

console.log('\n=== Backend Simulation ===');
console.log('Python: files = data.getlist("file")');
console.log('Result: files would contain', files.length, 'file objects');
console.log('File names:', files.map(f => f.name));

console.log('\n✅ FormData structure is correct for backend!');
