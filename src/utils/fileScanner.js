import CryptoJS from 'crypto-js';

// Simulate file system operations for demo purposes
const generateMockFiles = (count = 50) => {
  const extensions = ['jpg', 'png', 'pdf', 'doc', 'txt', 'mp3', 'mp4', 'zip'];
  const names = ['document', 'image', 'photo', 'video', 'music', 'archive', 'report', 'backup'];
  
  return Array.from({ length: count }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const ext = extensions[Math.floor(Math.random() * extensions.length)];
    const size = Math.floor(Math.random() * 10000000) + 1000; // 1KB to 10MB
    
    return {
      name: `${name}_${i}.${ext}`,
      path: `/Users/Documents/${name}_${i}.${ext}`,
      size: size,
      lastModified: Date.now() - Math.random() * 86400000 * 30, // Last 30 days
      content: generateMockContent(size)
    };
  });
};

const generateMockContent = (size) => {
  // Generate deterministic content based on size for duplicate detection
  const baseContent = 'This is sample file content for testing duplicate detection. ';
  const repeatCount = Math.floor(size / baseContent.length);
  return baseContent.repeat(repeatCount);
};

const calculateFileHash = (file) => {
  // For demo purposes, use file content to generate hash
  return CryptoJS.MD5(file.content).toString();
};

export const scanForDuplicates = async (inputFiles, onProgress) => {
  // For demo purposes, generate mock files if real files aren't available
  const files = inputFiles.length > 0 ? inputFiles : generateMockFiles();
  
  const fileMap = new Map();
  const duplicateGroups = [];
  
  // Process files with progress updates
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const progress = ((i + 1) / files.length) * 100;
    
    if (onProgress) {
      onProgress(progress, file.name || `file_${i}`);
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Calculate hash for duplicate detection
    let hash;
    if (file.content) {
      hash = calculateFileHash(file);
    } else {
      // For real files, we'd read the content and calculate hash
      hash = CryptoJS.MD5(file.name + file.size).toString();
    }
    
    const fileInfo = {
      name: file.name || `file_${i}`,
      path: file.path || `/path/to/${file.name || `file_${i}`}`,
      size: file.size || 0,
      lastModified: file.lastModified || Date.now(),
      hash: hash
    };
    
    if (fileMap.has(hash)) {
      fileMap.get(hash).push(fileInfo);
    } else {
      fileMap.set(hash, [fileInfo]);
    }
  }
  
  // Create duplicate groups
  fileMap.forEach((files, hash) => {
    if (files.length > 1) {
      duplicateGroups.push({
        hash: hash,
        files: files.sort((a, b) => a.lastModified - b.lastModified), // Sort by date, oldest first
        size: files[0].size,
        count: files.length
      });
    }
  });
  
  // Sort groups by potential space savings (size * duplicate count)
  return duplicateGroups.sort((a, b) => {
    const aSavings = a.size * (a.count - 1);
    const bSavings = b.size * (b.count - 1);
    return bSavings - aSavings;
  });
};