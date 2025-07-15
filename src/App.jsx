import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TitleBar from './components/TitleBar';
import ScanArea from './components/ScanArea';
import ResultsPanel from './components/ResultsPanel';
import ProgressModal from './components/ProgressModal';
import { scanForDuplicates } from './utils/fileScanner';
import './App.css';

function App() {
  const [duplicates, setDuplicates] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  const handleScan = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    setIsScanning(true);
    setScanProgress(0);
    setDuplicates([]);
    setTotalFiles(files.length);

    try {
      const results = await scanForDuplicates(files, (progress, fileName) => {
        setScanProgress(progress);
        setCurrentFile(fileName);
      });
      
      setDuplicates(results);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
      setCurrentFile('');
    }
  }, []);

  const handleDeleteFiles = useCallback((filesToDelete) => {
    // Simulate file deletion
    const updatedDuplicates = duplicates.map(group => ({
      ...group,
      files: group.files.filter(file => !filesToDelete.includes(file.path))
    })).filter(group => group.files.length > 1);
    
    setDuplicates(updatedDuplicates);
  }, [duplicates]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <TitleBar />
      
      <div className="flex-1 flex">
        <motion.div 
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ScanArea 
            onScan={handleScan}
            isScanning={isScanning}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
          
          <AnimatePresence>
            {duplicates.length > 0 && (
              <ResultsPanel 
                duplicates={duplicates}
                onDeleteFiles={handleDeleteFiles}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {isScanning && (
          <ProgressModal 
            progress={scanProgress}
            totalFiles={totalFiles}
            currentFile={currentFile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;