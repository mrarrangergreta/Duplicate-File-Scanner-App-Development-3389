import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import DuplicateGroup from './DuplicateGroup';
import * as FiIcons from 'react-icons/fi';

const { FiTrash2, FiInfo, FiFilter, FiDownload } = FiIcons;

const ResultsPanel = ({ duplicates, onDeleteFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [sortBy, setSortBy] = useState('size');

  const totalDuplicates = duplicates.reduce((sum, group) => sum + group.files.length - 1, 0);
  const totalSize = duplicates.reduce((sum, group) => {
    return sum + (group.files.length - 1) * group.size;
  }, 0);

  const handleSelectFile = (filePath) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(filePath)) {
      newSelected.delete(filePath);
    } else {
      newSelected.add(filePath);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === totalDuplicates) {
      setSelectedFiles(new Set());
    } else {
      const allFiles = new Set();
      duplicates.forEach(group => {
        group.files.slice(1).forEach(file => allFiles.add(file.path));
      });
      setSelectedFiles(allFiles);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.size > 0) {
      onDeleteFiles(Array.from(selectedFiles));
      setSelectedFiles(new Set());
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-1/2 bg-white border-t border-gray-200 flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Scan Results
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiInfo} />
              <span>{totalDuplicates} duplicates found</span>
              <span>•</span>
              <span>{formatSize(totalSize)} can be freed</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="size">Sort by Size</option>
              <option value="name">Sort by Name</option>
              <option value="count">Sort by Count</option>
            </select>

            <motion.button
              onClick={handleSelectAll}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedFiles.size === totalDuplicates ? 'Deselect All' : 'Select All'}
            </motion.button>

            <motion.button
              onClick={handleDeleteSelected}
              disabled={selectedFiles.size === 0}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiTrash2} />
              <span>Delete Selected ({selectedFiles.size})</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {duplicates.map((group, index) => (
            <DuplicateGroup
              key={index}
              group={group}
              selectedFiles={selectedFiles}
              onSelectFile={handleSelectFile}
              formatSize={formatSize}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPanel;