import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiX } = FiIcons;

const ProgressModal = ({ progress, totalFiles, currentFile }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-96 max-w-md mx-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiSearch} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Scanning Files
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">
            Files processed: {Math.round((progress / 100) * totalFiles)} of {totalFiles}
          </p>
          {currentFile && (
            <p className="text-xs text-gray-500 truncate">
              Current: {currentFile}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProgressModal;