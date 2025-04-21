import React, { useEffect, useState } from 'react';

const ShareModal = ({ isOpen, onClose, title = "Share", content = "Share this awesome tool with your friends!" }) => {
  const [isVisible, setIsVisible] = useState(false); // Initialize as false to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side only logic after mounting
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Only update visibility state after component has fully mounted
  useEffect(() => {
    if (isMounted) {
      setIsVisible(isOpen);
    }
  }, [isOpen, isMounted]);

  // Add event listener for escape key only on the client side
  useEffect(() => {
    // Ensure we're in a browser environment and the component is mounted
    if (typeof window === 'undefined' || !isMounted) return;
    
    // Only add listeners if the modal is visible
    if (!isVisible) return;
    
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    // Safe check for document before adding listener
    if (typeof document !== 'undefined' && document) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Cleanup function
    return () => {
      if (typeof document !== 'undefined' && document) {
        document.removeEventListener('keydown', handleEscKey);
      }
    };
  }, [isVisible, onClose, isMounted]);

  // Don't render anything during SSR or when not visible
  if (!isMounted || !isVisible) return null;

  // Handler for clipboard copy with safety checks
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy link:", error);
        alert("Could not copy link. Please try again.");
      }
    } else {
      alert("Copy to clipboard not supported in your browser.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-card p-6 max-w-md w-full z-10 shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <p className="text-gray-300 mb-6">{content}</p>
        
        <div className="space-y-4">
          <button
            className="w-full py-3 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={handleCopyLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Link
          </button>
          
          <div className="grid grid-cols-3 gap-3">
            <button className="py-3 rounded-lg bg-blue-800 hover:bg-blue-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </button>
            <button className="py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
