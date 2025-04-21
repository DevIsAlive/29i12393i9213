import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const DownloadModal = ({ isVisible, onClose, downloadName }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [modalRoot, setModalRoot] = useState(null);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    // Set document body as the modal root
    if (typeof document !== 'undefined') {
      setModalRoot(document.body);
    }
  }, []);

  // Handle modal visibility transitions
  useEffect(() => {
    if (isVisible && isMounted) {
      // Lock the body scroll
      document.body.style.overflow = 'hidden';
      
      // First mount with visibility:hidden to avoid flashes
      requestAnimationFrame(() => {
        // Then start fade-in on next frame
        setIsReady(true);
      });
      
      // Add event listener for escape key
      const handleEsc = (e) => {
        if (e.key === 'Escape') handleClose();
      };
      
      document.addEventListener('keydown', handleEsc);
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
    
    return () => {};
  }, [isVisible, isMounted]);

  // Handle smooth closing transition
  const handleClose = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsReady(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      onClose();
    }, 200);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Simulate download process
  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadComplete(true);
          setIsDownloading(false);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 200);
  };

  // Don't render during SSR or if not mounted
  if (!isMounted || !modalRoot) return null;

  const modalContent = (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        width: '100vw',
        height: '100vh',
        transition: 'opacity 0.2s ease-in-out',
        opacity: isReady ? 1 : 0,
        visibility: isReady || isClosing ? 'visible' : 'hidden',
        pointerEvents: isClosing ? 'none' : 'auto'
      }}
    >
      <div 
        ref={modalRef}
        className="modal-content relative w-full max-w-md p-6 rounded-xl glass-card border border-purple-500/30 shadow-glow"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) ${isReady ? 'scale(1)' : 'scale(0.95)'}`,
          maxHeight: '90vh',
          zIndex: 10000,
          boxSizing: 'border-box',
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          opacity: isReady ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        <button 
          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          Download The Finals Assistant
        </h3>

        {!isDownloading && !downloadComplete ? (
          <>
            <div className="mb-6">
              <p className="text-gray-300 mb-4">Your download is ready:</p>
              
              <div className="mb-6">
                <button 
                  className="w-full py-3 px-4 rounded-lg border border-blue-500 bg-blue-500/20 transition-all duration-300 hover:shadow-glow-sm"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.795l9.841-1.352.017 9.499-9.835.056L0 3.795zm9.828 9.382l.017 9.505-9.835-1.36V13.168l9.818.008zm1.196-10.93L24 0v11.999l-12.976.07V2.247zM24 12.144L24 24l-12.976-1.807-.014-10.059L24 12.144z"/>
                    </svg>
                    Windows
                  </div>
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-gray-300">1.0.5 (Stable)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-gray-300">24.3 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Updated:</span>
                  <span className="text-gray-300">Yesterday</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between gap-4">
              <button 
                className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white transition-all duration-300 hover:shadow-glow-sm"
                onClick={handleClose}
              >
                Cancel
              </button>
              
              <button 
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:shadow-glow hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300"
                onClick={handleDownload}
              >
                Download Now
              </button>
            </div>
          </>
        ) : downloadComplete ? (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500 animate-pulse">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h4 className="text-xl font-bold mb-2 text-white">Download Complete!</h4>
            <p className="text-gray-400 mb-6">Your download has completed successfully.</p>
            
            <div className="space-y-4">
              <button 
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:shadow-glow hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                onClick={() => window.open('/documentation', '_blank')}
              >
                View Documentation
              </button>
              
              <button 
                className="w-full py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white transition-all duration-300"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="mb-4 flex justify-between">
              <span className="text-gray-300">Downloading {downloadName}...</span>
              <span className="text-blue-400">{downloadProgress}%</span>
            </div>
            
            <div className="w-full h-2 bg-gray-700 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Please wait while we download your file...
            </div>
            
            <button 
              className="w-full py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 transition-all duration-300"
              onClick={handleClose}
            >
              Cancel Download
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

export default DownloadModal; 