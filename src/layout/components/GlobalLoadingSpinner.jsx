import React from 'react';
import { Spinner } from '../../componenets';
import { useLoading } from '../context/LoadingContext';

const GlobalLoadingSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
        <Spinner variant="primary" size="lg" />
        <p className="mt-4 text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoadingSpinner;
