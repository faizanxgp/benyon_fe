import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Hook for manual loading control (for non-API operations)
export const useManualLoading = () => {
  const { showLoading, hideLoading } = useLoading();
  
  const withLoading = async (asyncOperation) => {
    showLoading();
    try {
      const result = await asyncOperation();
      return result;
    } finally {
      hideLoading();
    }
  };

  return { showLoading, hideLoading, withLoading };
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => {
    setLoadingCount(prev => prev + 1);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setLoadingCount(prev => {
      const newCount = Math.max(0, prev - 1);
      if (newCount === 0) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  const value = {
    isLoading,
    showLoading,
    hideLoading,
    loadingCount
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
