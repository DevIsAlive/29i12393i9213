import React, { useEffect, useState } from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner-container">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 