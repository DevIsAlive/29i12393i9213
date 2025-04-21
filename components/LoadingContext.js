import React, { createContext, useState, useContext } from 'react';
import LoadingSpinner from './LoadingSpinner';

// Create a context for loading state
const LoadingContext = createContext();

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  // Show loading spinner with optional custom message
  const showLoading = (customMessage) => {
    if (customMessage) setMessage(customMessage);
    setLoading(true);
  };

  // Hide loading spinner
  const hideLoading = () => {
    setLoading(false);
    setMessage('Loading...'); // Reset to default message
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && <LoadingSpinner message={message} />}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 