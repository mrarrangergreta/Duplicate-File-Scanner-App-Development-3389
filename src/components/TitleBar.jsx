import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiMinus, FiSquare, FiX } = FiIcons;

const TitleBar = () => {
  return (
    <div className="h-8 bg-gray-800 flex items-center justify-between px-4 select-none">
      <div className="flex items-center space-x-2">
        <SafeIcon icon={FiSearch} className="text-blue-400 text-sm" />
        <span className="text-white text-xs font-medium">Duplicate File Scanner</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <SafeIcon icon={FiMinus} className="text-white text-xs" />
        </motion.button>
        
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <SafeIcon icon={FiSquare} className="text-white text-xs" />
        </motion.button>
        
        <motion.button
          whileHover={{ backgroundColor: 'rgba(239,68,68,0.8)' }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded hover:bg-red-500 transition-colors"
        >
          <SafeIcon icon={FiX} className="text-white text-xs" />
        </motion.button>
      </div>
    </div>
  );
};

export default TitleBar;