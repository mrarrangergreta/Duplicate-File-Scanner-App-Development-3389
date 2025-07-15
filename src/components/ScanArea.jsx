import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFolder, FiPlay, FiUpload, FiSettings } = FiIcons;

const ScanArea = ({ onScan, isScanning, selectedPath, setSelectedPath }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onScan(files);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onScan(files);
    }
  };

  const handleFolderSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Duplicate File Scanner
          </h1>
          <p className="text-gray-600">
            Find and remove duplicate files to free up disk space
          </p>
        </div>

        <motion.div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <SafeIcon 
            icon={FiUpload} 
            className={`mx-auto mb-4 text-5xl ${
              dragActive ? 'text-blue-500' : 'text-gray-400'
            }`} 
          />
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {dragActive ? 'Drop files here' : 'Select files to scan'}
          </h3>
          
          <p className="text-gray-500 mb-6">
            Drag and drop files or click to browse
          </p>

          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={handleFolderSelect}
              disabled={isScanning}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiFolder} />
              <span>Browse Files</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiSettings} />
              <span>Settings</span>
            </motion.button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept="*/*"
          />
        </motion.div>

        {selectedPath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiFolder} />
              <span>Selected: {selectedPath}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScanArea;