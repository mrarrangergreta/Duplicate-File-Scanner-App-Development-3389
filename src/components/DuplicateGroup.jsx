import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronRight, FiFile, FiFolder, FiTrash2 } = FiIcons;

const DuplicateGroup = ({ group, selectedFiles, onSelectFile, formatSize }) => {
  const [expanded, setExpanded] = useState(false);

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return FiFile;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <div
        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SafeIcon 
              icon={expanded ? FiChevronDown : FiChevronRight} 
              className="text-gray-500" 
            />
            <SafeIcon icon={getFileIcon(group.files[0].name)} className="text-blue-500" />
            <div>
              <h3 className="font-medium text-gray-800">{group.files[0].name}</h3>
              <p className="text-sm text-gray-600">
                {group.files.length} copies • {formatSize(group.size)} each
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-red-600">
              {formatSize((group.files.length - 1) * group.size)} wasted
            </p>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="border-t border-gray-200"
        >
          <div className="p-4 space-y-2">
            {group.files.map((file, index) => (
              <div
                key={file.path}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {index > 0 && (
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.path)}
                      onChange={() => onSelectFile(file.path)}
                      className="rounded border-gray-300"
                    />
                  )}
                  <SafeIcon icon={FiFolder} className="text-gray-400 text-sm" />
                  <span className="text-sm text-gray-700 truncate max-w-md">
                    {file.path}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Original
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {new Date(file.lastModified).toLocaleDateString()}
                  </span>
                  {index > 0 && (
                    <motion.button
                      onClick={() => onSelectFile(file.path)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiTrash2} className="text-sm" />
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DuplicateGroup;