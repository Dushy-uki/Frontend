import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;